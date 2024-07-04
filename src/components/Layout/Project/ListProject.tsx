import axios from "axios";
import { useEffect, useState } from "react";
import { API_MYPROJECT_ENDPOINTS } from "../../../util/apiConfig";

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

  console.log("project", project);

  return (
    <section className="content">
      <div className="bg-white shadow-lg rounded-sm px-4 py-4 lg:h-auto text-smdark overflow-hidden min-h-96">
        <h1 className="text-xl font-bold py-4">Project</h1>
        {error && <p>{error}</p>}
        <div className="">
          <table 
          style={{width: "100%"}}
          className="divide-gray-200">
            <thead className="bg-gray-50 ">
              <tr className="odd:bg-white even:bg-slate-100">
                <th >Title</th>
                <th >Tag</th>
                <th >Category</th>
                <th >Created at</th>
                <th  className="relative px-6 py-3">
                  Edit
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {project?.map<JSX.Element>((e: Project, index: number) => (
                <tr key={index} className="border">
                  <td>{e.title}</td>
                  <td>{e.category}</td>
                  <td>{e.tag}</td>
                  <td>{e.createdAt}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <a
                      href="#"
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Edit
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ListProject;
