import React, { FormEvent, useState } from "react";
import { IoArrowBackCircle } from "react-icons/io5";
import SubmitButton from "../../../common/Button/SubmitButton";
import { API_MYPROJECT_ENDPOINTS } from "../../../../util/apiConfig";
import axios from "axios";
import { useAuth } from "../../Auth/AuthContext";
import { toast } from "react-toastify";

const CreateProject: React.FC<{ 
  handleEvents: (e: string) => void, 
  getProject: () => Promise<void> 
}> = ({
  handleEvents,
  getProject,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [title, setTitle] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [tag, setTag] = useState<string>();
  const [category, setCategory] = useState<string>();
  const [linkWeb, setLinkWeb] = useState<string>();
  const [linkGit, setLinkGit] = useState<string>();

  const backToListProject = () => handleEvents("list");

  const { token } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        API_MYPROJECT_ENDPOINTS,
        {
          title: title,
          tag: tag,
          category: category,
          description: description,
          link_web: linkWeb,
          link_git: linkGit,
        },
        { headers: { Authorization: `${token}` } }
      );
      console.log("response", response);
      await getProject();
      backToListProject();
      toast.success("Creating Project was Success")
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
      <section className="h-screen w-full bg-white dark:bg-dark absolute flex flex-col justify-between">
        <div className="p-4 border-b flex items-center gap-4">
          <button
            onClick={backToListProject}
            className="text-3xl hover:text-main"
          >
            <IoArrowBackCircle />
          </button>
          <h1 className="text-xl font-bold uppercase">Create Your Product</h1>
        </div>
        <div className="container py-4 px-4 lg:px-28 h-full overflow-y-auto ">
          {error && (
            <section className="bg-red-100 text-red-500 p-2 rounded-md">
              <p>{error}!</p>
            </section>
          )}
          <section className="flex w-full flex-wrap gap-4 justify-between">
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
            <div className="flex flex-col w-full gap-2 lg:w-[45%] lg:h-20">
              <label className="text-sm">Description</label>
              <input
                className="border w-full rounded-md h-12 p-2 bg-lgdark"
                placeholder="Description"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
          </section>
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
