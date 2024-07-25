import { useEffect, useState } from "react";
import Content from "../../../common/Content/Content";
import { ProjectType } from "../Project/interface";
import axios from "axios";
import { API_MYPROJECT_ENDPOINTS } from "../../../../util/apiConfig";
import RegularLoading from "../../../common/Loading/RegularLoading";

const Dashboard = () => {
  const [project, setProject] = useState<[ProjectType] | undefined>();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<TagType[]>();
  const [highValue, sethighValue] = useState<number>(0)

  const getProject = async () => {
    setIsLoading(true);
    try {
      const result = await axios.get(API_MYPROJECT_ENDPOINTS);
      setProject(result.data.data);
      console.log("project", result);
      countProject(result.data.data);
    } catch (error) {
      setError("error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProject();
  }, []);

  interface TagType {
    name: string;
    value: number;
  }
  const countProject = (projects: [ProjectType]) => {
    const tags: TagType[] = [];
    console.log("projects", projects);
    let maxValue: number = 0
    for (const p of projects) {
      const splitP = p.tag.split(",");
      console.log("splitP", splitP);
      for (const subTag of splitP) {
        console.log("subTag", subTag);

        if (tags.some((tag) => tag.name === subTag)) {
          const indexOfTags = tags.findIndex((t) => t.name === subTag);
          tags[indexOfTags].value += 1;
          maxValue = maxValue+1
        } else {
          tags.push({ name: subTag, value: 1 });
          maxValue = maxValue+1
        }
      }
    }
    const tagsOrder: TagType[] = tags.sort((a, b) => b.value - a.value)
    setData(tagsOrder);
    sethighValue(tagsOrder[0].value);
    console.log("tags", tags);
  };

  // chart
  // const data = [
  //   { name: "Group A", value: 1100 },
  //   { name: "Group B", value: 400 },
  //   { name: "Group C", value: 300 },
  //   { name: "Group D", value: 200 },
  // ];

  return (
    <Content>
      <div className="content h-auto">
        {error && (
          <h1>{error}</h1>
        )}
        {(isLoading && (
          <div>
            <RegularLoading />
          </div>
        )) || (
          <>
            <div className="flex justify-between gap-4 text-sm font-semibold">
              <div>

                <article className="text-white bg-gradient-to-r from-indigo-500 to-sky-500 w-full lg:w-80 p-4 rounded-2xl">
                  <h2>Total Project</h2>
                  <div className="flex justify-between items-end">
                    <span className="font-semibold text-6xl text-white">
                      {project?.length}
                    </span>
                    <svg
                      className="w-[48px] h-[48px] text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 7.205c4.418 0 8-1.165 8-2.602C20 3.165 16.418 2 12 2S4 3.165 4 4.603c0 1.437 3.582 2.602 8 2.602ZM12 22c4.963 0 8-1.686 8-2.603v-4.404c-.052.032-.112.06-.165.09a7.75 7.75 0 0 1-.745.387c-.193.088-.394.173-.6.253-.063.024-.124.05-.189.073a18.934 18.934 0 0 1-6.3.998c-2.135.027-4.26-.31-6.3-.998-.065-.024-.126-.05-.189-.073a10.143 10.143 0 0 1-.852-.373 7.75 7.75 0 0 1-.493-.267c-.053-.03-.113-.058-.165-.09v4.404C4 20.315 7.037 22 12 22Zm7.09-13.928a9.91 9.91 0 0 1-.6.253c-.063.025-.124.05-.189.074a18.935 18.935 0 0 1-6.3.998c-2.135.027-4.26-.31-6.3-.998-.065-.024-.126-.05-.189-.074a10.163 10.163 0 0 1-.852-.372 7.816 7.816 0 0 1-.493-.268c-.055-.03-.115-.058-.167-.09V12c0 .917 3.037 2.603 8 2.603s8-1.686 8-2.603V7.596c-.052.031-.112.059-.165.09a7.816 7.816 0 0 1-.745.386Z" />
                    </svg>
                  </div>
                </article>
              </div>
              
              <div className="det w-full p-4 border rounded-2xl ">
                <h1 className="font-semibold mb-4 ">Statistic Tag :</h1>
                {data?.map((d, i) => (
                  <div
                    key={i}
                    className={`py-1 px-4 capitalize font-normal w-full flex items-center gap-2`}
                  >
                    <div className="w-1/5">
                      <p className={` text-sm text-secondary `}>
                        {d.name}
                      </p>
                    </div>
                    <div className="w-full">
                      <div style={{width: `${(d.value / highValue) * 100 }%`}} className=" bg-gradient-to-r from-indigo-500 to-sky-500 rounded-2xl p-2 h-1 flex items-center justify-end">
                        <p className="text-white text-[10px]">used {d.value} times</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </>
        )}
      </div>
    </Content>
  );
};

export default Dashboard;
