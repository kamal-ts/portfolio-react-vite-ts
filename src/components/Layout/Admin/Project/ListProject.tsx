import React, { FormEvent, useState } from "react";
import { PagingPage, ProjectType, QueryParams } from "./interface";
import {
  FaFilter,
  FaSearch,
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
  paging: PagingPage;
  setQueryParams: React.Dispatch<React.SetStateAction<QueryParams | null>>;
  queryParams: QueryParams | null
}> = ({
  error,
  project,
  handleEvents,
  handleDeleteProject,
  isLoading,
  paging,
  setQueryParams,
  queryParams,
}) => {
  const [idProject, setIdProject] = useState<string>("");
  const [modalIsActive, setModalIsActive] = useState(false);
  const [keyword, setKeyword] = useState<string>();

  

  const LoopPaging = () => {
    const list = [];
    if (paging?.total_page) {
      for (let i = 1; i <= paging.total_page; i++) {
        list.push(
          <li key={i}>
            {(paging.current_page === i && (
              <button
                onClick={() => setQueryParams({...queryParams, page: i })}
                aria-current="page"
                className="flex items-center justify-center px-4 h-10 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
              >
                {i}
              </button>
            )) || (
              <button
                onClick={() => setQueryParams({...queryParams, page: i })}
                className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
              >
                {i}
              </button>
            )}
          </li>
        );
      }
    }
    return list;
  };

  const search = (e: FormEvent) => {
    e.preventDefault();
      setQueryParams({ ...queryParams, title: keyword, page: 1});
  };

  const previous = () => {
    if (paging?.current_page && paging.current_page <= 1) {
      setQueryParams({...queryParams, page: 1})
    } else if (paging?.current_page) {
      setQueryParams({...queryParams, page: paging?.current_page - 1})
    }
  }

  const next = () => {
    if (paging.current_page < paging.total_page) {
      setQueryParams({...queryParams, page: paging.current_page + 1})
    } 
  }

  return (
    <Content>
      <section className="content">
        <h1 className="text-sm font-bold ">Project</h1>
        {error && <p>{error}</p>}
        <div className="py-4 flex flex-col lg:flex-row items-center justify-between gap-4 text-secondary">
          <div className="flex items-center gap-2 w-full lg:max-w-96 ">
            <form className="w-full" onSubmit={search}>
              <label
                htmlFor="default-search"
                className="mb-2 text-base font-medium text-gray-900 sr-only dark:text-white"
              >
                Search
              </label>
              <div className="z-[1] relative flex flex-col justify-center items-center">
                <div className="z-[1] absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <FaSearch />
                </div>
                <input
                  onChange={(e) => setKeyword(e.target.value)}
                  type="search"
                  id="default-search"
                  className="block w-full px-4 py-2 ps-10 text-base text-gray-900 border border-gray-300 rounded-3xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="keyword title..."
                />
                <button
                  type="submit"
                  className="text-white absolute end-[3.5px] bg-main hover:contrast-150 hover:con focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-3xl text-sm px-2 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
          <div className="flex gap-2 w-full lg:w-80">
            <RegularButton 
            onClick={() => setQueryParams({title: ""})} 
            ><span className="flex justify-center">

              <svg className="w-5 h-5 mr-2 -ml-1" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"></path>
						</svg>
              Refhres
            </span>
              </RegularButton>
            <RegularButton 
            onClick={() => handleEvents("create")} 
            >
              <span className="flex justify-center">
              <svg className="w-5 h-5 mr-2 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
              Add Project
              </span>
            </RegularButton>
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
              {(isLoading && (
                <tr className="border">
                  <td colSpan={6}>
                    <div role="status" className="">
                      <svg
                        aria-hidden="true"
                        className="mx-auto w-8 h-40 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span className="sr-only">Loading...</span>
                    </div>
                  </td>
                </tr>
              )) ||
                project?.map<JSX.Element>((e: ProjectType, index: number) => (
                  <tr key={index} className="border-t dark:border-secondary">
                    <td>{(paging?.current_page-1)*10+(index+1)}</td>
                    <td>{e.title}</td>
                    <td>{e.category}</td>
                    <td>{e.tag}</td>
                    <td>{e.createdAt}</td>
                    <td className="px-6 whitespace-nowrap text-right text-xs font-bold">
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            handleEvents(e.id);
                          }}
                          className="outline outline-2 outline-indigo-600 -outline-offset-1 hover:bg-indigo-600 text-indigo-600 hover:text-white px-2 py-1 rounded-2xl transition-colors "
                        >
                          {/* <FaEye /> */}
                          Detile
                        </button>
                        <button
                          onClick={() => {
                            setIdProject(e.id);
                            setModalIsActive(true);
                          }}
                          className="outline outline-2 outline-red-600 -outline-offset-1 hover:bg-red-600 text-red-600 hover:text-white px-2 py-1 rounded-2xl transition-colors "
                        >
                          {/* <FaTrash /> */}
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {
                  !project?.[0] && isLoading === false &&(
                    <tr>
                      <td colSpan={6} className="text-center">
                        <div className="bg-xldark py-10">Data Empty</div>
                      </td>
                    </tr>
                  )
                }
            </tbody>
          </table>
        </div>

        <nav
          aria-label="Page navigation example"
          className="mt-4 w-full flex items-center justify-between"
        >
          <span className="text-secondary">
            Page {paging?.current_page} of {paging?.total_page} | Total Data :{" "}
            {paging?.total_item}
          </span>

          <ul className="inline-flex -space-x-px text-base h-10">
            <li>
              <button
                onClick={previous}
                className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Previous
              </button>
            </li>
            {LoopPaging()}

            <li>
              <button
                onClick={next}
                className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
        <SmModal isAcctive={modalIsActive}>
          <div className="max-w-xs w-full p-6 bg-white dark:bg-smdark rounded-3xl flex flex-col gap-6">
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
                borderColor="#94a3b8"
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
