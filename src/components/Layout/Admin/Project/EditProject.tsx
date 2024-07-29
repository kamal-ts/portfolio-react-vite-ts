import React, { FormEvent, useEffect, useState } from "react";
import { IoArrowBackCircle } from "react-icons/io5";
import SubmitButton from "../../../common/Button/SubmitButton";
import { API_MYPROJECT_ENDPOINTS } from "../../../../util/apiConfig";
import axios from "axios";
import { useAuth } from "../../Auth/AuthContext";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import RegularLoading from "../../../common/Loading/RegularLoading";



const modules = {
  toolbar: [
    [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ 'align': [] }],
    [{ 'color': [] }, { 'background': [] }],
    ['link', 'image'],
    ['clean']                                         
  ],
};

const formats = [
  'header', 'font',
  'list', 'bullet',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'align',
  'color', 'background',
  'link', 'image'
];

const EditProject: React.FC<{
  handleEvents: (e: string) => void;
  idProject: string;
  getProject: () => Promise<void>
}> = ({ handleEvents, idProject, getProject }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [tag, setTag] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [linkWeb, setLinkWeb] = useState<string>("");
  const [linkGit, setLinkGit] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const backToListProject = () => handleEvents("list");

  const { token } = useAuth();

  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      console.log("first", e.target.files[0]);
    }
  };

  const getSingleProduct = async () => {
    setIsLoading(true);
    try {
      const result = await axios.get(
        API_MYPROJECT_ENDPOINTS + "/" + idProject,
        {
          headers: { Authorization: token },
        }
      );
      setTag(result.data.data.tag);
      setDescription(result.data.data.description);
      setTitle(result.data.data.title);
      setCategory(result.data.data.category);
      setLinkGit(result.data.data.link_git);
      setLinkWeb(result.data.data.link_web);
      setImage(result.data.data.image[0].secure_url)
    } catch (error) {
      console.log('error', error)
      setError("Failed");
    }finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    let formData;
    if (selectedFile) {
      formData = new FormData();
      formData.append("image", selectedFile);
      formData.append("title", title);
      formData.append("tag", tag);
      formData.append("category", category);
      formData.append("description", description);
      formData.append("link_web", linkWeb);
      formData.append("link_git", linkGit);
    } else {
      formData = {
        title: title,
        tag: tag,
        category: category,
        description: description,
        link_web: linkWeb,
        link_git: linkGit,
      };
    }

    try {
      const response = await axios.put(API_MYPROJECT_ENDPOINTS+"/"+idProject, formData, {
        headers: { Authorization: `${token}` },
      });
      console.log("response", response);
      handleEvents(idProject);
      getProject();
      toast.success("Update Project was Success");
    } catch (err) {
      console.log('error', error)
      if (axios.isAxiosError(err) && err.response?.data.errors) {
        setError(err.response.data.errors);
      } else {
        setError("An unexpected error occurred.");
      }
      // setError("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <section className="z-[9002] h-screen w-full bg-white dark:bg-dark absolute flex flex-col justify-between">
        <div className="p-4 border-b flex items-center gap-4">
          <button
            onClick={backToListProject}
            className="text-3xl hover:text-main"
          >
            <IoArrowBackCircle />
          </button>
          <h1 className="text-xl font-bold uppercase">Create Your Product</h1>
          <h2>{idProject}</h2>
        </div>
        <div className="container py-4 pb-20 px-4 lg:px-28 h-full overflow-y-auto ">
          {error && (
            <section className="bg-red-100 text-red-500 p-2 rounded-md">
              <p>{error}!</p>
            </section>
          )}
          {(isLoading && <RegularLoading />) || (
            <section className="flex w-full flex-wrap gap-4 justify-between">
              <ReactQuill
                placeholder="Write description"
                className="w-full min-h-40 mb-9"
                value={description}
                onChange={setDescription}
                modules={modules}
                formats={formats}
              />
              <div className="flex flex-col w-full gap-2 lg:w-[45%] ">
                <label
                  className="block text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="file_input"
                >
                  Upload file
                </label>
                <input
                  className="block w-full h-12 text-base text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  type="file"
                  onChange={handleFileChange}
                />
                {selectedFile && (
                  <img
                    src={URL.createObjectURL(selectedFile)}
                    className="max-h-40 object-cover"
                  />
                ) || (
                  <img
                    src={image}
                    className="max-h-40 object-cover"/>
                )}
              </div>
              <div className="flex flex-col w-full gap-2 lg:w-[45%] lg:h-20">
                <label className="text-sm">Title</label>
                <input
                  className="border w-full rounded-md h-12 p-2 bg-lgdark"
                  placeholder="Title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col w-full gap-2 lg:w-[45%] lg:h-20">
                <label className="text-sm">Tag</label>
                <input
                  className="border w-full rounded-md h-12 p-2 bg-lgdark"
                  placeholder="Tag"
                  type="text"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col w-full gap-2 lg:w-[45%] lg:h-20">
                <label className="text-sm">Category</label>
                <input
                  className="border w-full rounded-md h-12 p-2 bg-lgdark"
                  placeholder="Category"
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col w-full gap-2 lg:w-[45%] lg:h-20">
                <label className="text-sm">Link Git</label>
                <input
                  className="border w-full rounded-md h-12 p-2 bg-lgdark"
                  placeholder="LinkGit"
                  type="text"
                  value={linkGit}
                  onChange={(e) => setLinkGit(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col w-full gap-2 lg:w-[45%] lg:h-20">
                <label className="text-sm">Link Web</label>
                <input
                  className="border w-full rounded-md h-12 p-2 bg-lgdark"
                  placeholder="LinkWeb"
                  type="text"
                  value={linkWeb}
                  onChange={(e) => setLinkWeb(e.target.value)}
                  required
                />
              </div>
            </section>
          )}
        </div>
        <div className="px-4 py-2 border-t w-full flex gap-4 justify-end">
          <button
            onClick={backToListProject}
            className="bg-mddark rounded-lg w-20"
          >
            Cencel
          </button>
          <div className="w-20">
            <SubmitButton
              isLoading={isLoading}
              titleProses={"Saving..."}
              title="Save"
            />
          </div>
        </div>
      </section>
    </form>
  );
};

export default EditProject;
