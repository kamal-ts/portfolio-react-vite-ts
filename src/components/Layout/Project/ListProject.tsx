import axios from "axios";
import { useEffect, useState } from "react";
import { API_MYPROJECT_ENDPOINTS } from "../../../util/apiConfig";
import Content from "../../common/Content/Content";
import {
  FaEdit,
  FaEye,
  FaFilter,
  FaPlus,
  FaSearch,
  FaTrash,
} from "react-icons/fa";

const ListProject = () => {
  interface Project {
    title: string;
    tag: string;
    category: string;
    createdAt: string;
  }

  const [project, setProject] = useState<[Project]>();
  const [error, setError] = useState("");

  const getProject = async () => {
    try {
      const result = await axios.get(API_MYPROJECT_ENDPOINTS);
      setProject(result.data.data);
    } catch (error) {
      setError("error");
    }
  };

  useEffect(() => {
    getProject();
  }, []);

  return (
    <Content>
      <div className="content">
        <h1 className="text-xl font-bold py-4">Project</h1>
        {error && <p>{error}</p>}
        <div className="py-4 flex items-center justify-between gap-4 text-secondary">
          <div className="flex items-center gap-2 min-w-96">
            <form className="w-full">
              <label
                htmlFor="default-search"
                className="mb-2 text-base font-medium text-gray-900 sr-only dark:text-white"
              >
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <FaSearch/>
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="block w-full px-4 py-2 ps-10 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Keywor..."
                  required
                />
                <button
                  type="submit"
                  className="text-white absolute end-2.5 bottom-1.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Search
                </button>
              </div>
            </form>

            <button className="flex items-center gap-1 px-4 py-2 bg-lgdark border rounded-lg">
              <FaFilter />
              <span>Filter</span>
            </button>
          </div>
          <div className="">
            <button className="flex items-center gap-1 px-4 py-2 bg-main text-white rounded-lg">
              <FaPlus />
              <span>Add Project</span>
            </button>
          </div>
        </div>
        <div className="w-auto overflow-x-auto rounded-lg border">
          <table style={{ width: "100%" }} className="divide-gray-200">
            <thead className="bg-gray-50 ">
              <tr className="odd:bg-white even:bg-slate-100">
                <th>Title</th>
                <th>Tag</th>
                <th>Category</th>
                <th>Created at</th>
                <th className="relative px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y  divide-gray-200">
              {project?.map<JSX.Element>((e: Project, index: number) => (
                <tr key={index} className="border ">
                  <td>{e.title}</td>
                  <td>{e.category}</td>
                  <td>{e.tag}</td>
                  <td>{e.createdAt}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-lg font-medium ">
                    <div className="flex gap-2">
                      <a href="#" className="text-main hover:text-indigo-900 ">
                        <FaEdit />
                      </a>
                      <a
                        href="#"
                        className="text-green-600 hover:text-green-900 "
                      >
                        <FaEye />
                      </a>
                      <a href="#" className="text-red-600 hover:text-red-900">
                        <FaTrash />
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

<nav aria-label="Page navigation example" className="mt-4 w-full flex items-center justify-between">

  <span  className="text-secondary">Page 1 of 100</span>

  <ul className="inline-flex -space-x-px text-base h-10">
    <li>
      <a href="#" className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
    </li>
    <li>
      <a href="#" className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
    </li>
    <li>
      <a href="#" className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
    </li>
    <li>
      <a href="#" aria-current="page" className="flex items-center justify-center px-4 h-10 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
    </li>
    <li>
      <a href="#" className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">4</a>
    </li>
    <li>
      <a href="#" className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">5</a>
    </li>
    <li>
      <a href="#" className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
    </li>
  </ul>
</nav>

      </div>
    </Content>
  );
};

export default ListProject;
