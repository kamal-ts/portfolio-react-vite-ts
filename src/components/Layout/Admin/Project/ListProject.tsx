import React, { useState } from "react";
import { PagingPage, ProjectType } from "./interface";
import {
  FaEdit,
  FaEye,
  FaFilter,
  FaPlus,
  FaSearch,
  FaTrash,
} from "react-icons/fa";
import Content from "../../../common/Content/Content";
import SmModal from "../../../common/Modal/SmModal";
import RegularButton from "../../../common/Button/RegularButton";
import { RiErrorWarningLine } from "react-icons/ri";

const ListProject: React.FC<{
  error: string;
  project: [ProjectType] | undefined;
  handleEvents: (e: string) => void;
  handleDeleteProject: (idProject: string) => Promise<void>;
  isLoading: boolean;
  paging: PagingPage | undefined;
}> = ({
  error,
  project,
  handleEvents,
  handleDeleteProject,
  isLoading,
  paging,
}) => {
  const [idProject, setIdProject] = useState<string>("");
  const [modalIsActive, setModalIsActive] = useState(false);

  const LoopPaging = () => {
    if (paging?.total_page) {
      for (let i = 1; i <= paging?.total_page; i++)
        return (
      <li>
            {paging.current_page === i && (
               <a
               href="#"
               aria-current="page"
               className="flex items-center justify-center px-4 h-10 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
             >
               {i}
             </a>
            ) || (

              <a
              href="#"
              className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
              >
              {i}
            </a>
            )}
          </li>
        );
    }
  };

  return (
    <Content>
      <section className="content">
        <h1 className="text-sm font-bold ">Project</h1>
        {error && <p>{error}</p>}
        <div className="py-4 flex items-center justify-between gap-4 text-secondary ">
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
                  <FaSearch />
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

            <button className="flex items-center gap-1 bg-lgdark dark:bg-smdark px-4 py-2 rounded-lg">
              <FaFilter />
              <span>Filter</span>
            </button>
          </div>
          <div className="">
            <button
              onClick={() => handleEvents("create")}
              className="flex items-center gap-1 px-4 py-2 bg-main text-white rounded-lg"
            >
              <FaPlus />
              <span>Add Project</span>
            </button>
          </div>
        </div>
        <div className="w-auto overflow-x-auto rounded-lg border dark:border-secondary">
          <table style={{ width: "100%" }} className="divide-gray-200">
            <thead className="bg-gray-50 dark:bg-smdark">
              <tr className="odd:bg-white dark:odd:bg-smdark even:bg-slate-100">
                <th>#</th>
                <th>Title</th>
                <th>Tag</th>
                <th>Category</th>
                <th>Created at</th>
                <th className="relative px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className=" dark:bg-smdark ">
              {project?.map<JSX.Element>((e: ProjectType, index: number) => (
                <tr key={index} className=" border dark:border-secondary">
                  <td>{e.id}</td>
                  <td>{e.title}</td>
                  <td>{e.category}</td>
                  <td>{e.tag}</td>
                  <td>{e.createdAt}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-lg font-medium ">
                    <div className="flex gap-2">
                      <a href="#" className="text-main hover:text-indigo-900 ">
                        <FaEdit />
                      </a>
                      <button
                        onClick={() => {
                          handleEvents(e.id);
                        }}
                        className="text-green-600 hover:text-green-900 "
                      >
                        <FaEye />
                      </button>
                      <button
                        onClick={() => {
                          setIdProject(e.id);
                          setModalIsActive(true);
                        }}
                        className="text-red-600 hover:text-red-900"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <nav
          aria-label="Page navigation example"
          className="mt-4 w-full flex items-center justify-between"
        >
          <span className="text-secondary">Page {paging?.current_page} of {paging?.total_page} | Total Data : {paging?.total_item}</span>

          <ul className="inline-flex -space-x-px text-base h-10">
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Previous
              </a>
            </li>
            {LoopPaging()}

            <li>
              <a
                href="#"
                className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Next
              </a>
            </li>
          </ul>
        </nav>
        <SmModal isAcctive={modalIsActive}>
          <div className="max-w-xs w-full p-6 bg-white rounded-3xl flex flex-col gap-6">
            <div className="flex flex-col items-center justify-center gap-2">
              <h1 className="text-7xl text-red-500">
                <RiErrorWarningLine />
              </h1>
              <h1 className="text-xl font-semibold">Are You Sure ?</h1>
              <p className="text-secondary">
                You are going to delete the project
              </p>
            </div>
            <div className="flex gap-4">
              <RegularButton
                onClick={() => setModalIsActive(!modalIsActive)}
                Bgcolor="#f1f5f9"
                color="#64748b"
                title="Cencel"
                isLoading={isLoading}
              />
              <RegularButton
                onClick={async () => {
                  await handleDeleteProject(idProject);
                  setModalIsActive(!modalIsActive);
                }}
                Bgcolor="#dc2626"
                title="Delete"
                titleProses={"Deleting..."}
                isLoading={isLoading}
              />
            </div>
          </div>
        </SmModal>
      </section>
    </Content>
  );
};

export default ListProject;
