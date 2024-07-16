import React, { FormEvent, useState } from "react";
import { IoArrowBackCircle } from "react-icons/io5";
import SubmitButton from "../../../common/Button/SubmitButton";
import { API_MYPROJECT_ENDPOINTS } from "../../../../util/apiConfig";
import axios from "axios";
import { useAuth } from "../../Auth/AuthContext";
import { toast } from "react-toastify";

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreateProject: React.FC<{
  handleEvents: (e: string) => void;
  getProject: () => Promise<void>;
}> = ({ handleEvents, getProject }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [tag, setTag] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [linkWeb, setLinkWeb] = useState<string>("");
  const [linkGit, setLinkGit] = useState<string>("");

  const backToListProject = () => handleEvents("list");

  const { token } = useAuth();

  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      console.log('first', e.target.files[0])
    }
  };

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
    }else{ 
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
      const response = await axios.post(API_MYPROJECT_ENDPOINTS, formData, {
        headers: { Authorization: `${token}` },
      });
      console.log("response", response);
      await getProject();
      backToListProject();
      toast.success("Creating Project was Success");
    } catch (err) {
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
        </div>
        <div className="container py-4 pb-20 px-4 lg:px-28 h-full overflow-y-auto ">
          {error && (
            <section className="bg-red-100 text-red-500 p-2 rounded-md">
              <p>{error}!</p>
            </section>
          )}
          <section className="flex w-full flex-wrap gap-4 justify-between">
          <ReactQuill placeholder="Write description" className="w-full min-h-40 mb-9" value={description} onChange={setDescription} />
            <div className="flex flex-col w-full gap-2 lg:w-[45%] ">
              <label
                className="block text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="file_input"
              >
                Upload file
              </label>
              <input
                className="block w-full h-12 text-base text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                // aria-describedby="file_input_help"
                // id="file_input"
                type="file"
                onChange={handleFileChange}
              />
              {selectedFile && (
                <img src={URL.createObjectURL(selectedFile)} className="max-h-40" />
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
            {/* <div className="flex flex-col w-full gap-2 lg:w-[45%] lg:h-20">
              <label className="text-sm">Description</label>
              <input
                className="border w-full rounded-md h-12 p-2 bg-lgdark"
                placeholder="Description"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div> */}
            
          </section>
            {/* <div className="w-full min-h-60 border">

            <CKEditor
                
                editor={ClassicEditor}
                data=""
                onReady={editor => {
                    // You can store the "editor" and use when it is needed.
                    console.log('Editor is ready to use!', editor);
                }}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    setDescription(data)
                }}
                onBlur={(event, editor) => {
                    console.log('Blur.', editor);
                }}
                onFocus={(event, editor) => {
                    console.log('Focus.', editor);
                }}
            />
                </div> */}
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

export default CreateProject;
