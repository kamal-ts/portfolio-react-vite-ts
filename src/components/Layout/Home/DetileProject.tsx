import { useNavigate, useParams } from "react-router-dom";
import Footer from "./Footer";
import { IoArrowBackCircle } from "react-icons/io5";
import { ProjectType } from "../Admin/Project/interface";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_MYPROJECT_ENDPOINTS } from "../../../util/apiConfig";
import Paragraph from "../../common/Skeleton/Paragraph";
import parse, { HTMLReactParserOptions } from "html-react-parser";

const DetileProject = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [error, setError] = useState("");
  const [project, setProject] = useState<ProjectType>();
  const [description, setDescription] = useState("");

  const getSingleProduct = async () => {
    try {
      const result = await axios.get(API_MYPROJECT_ENDPOINTS + "/" + projectId);
      setProject(result.data.data);
      setDescription(result.data.data.description);
      console.log("result", result);
    } catch (error) {
      setError("Data is Empty");
      console.log("error", error);
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, []);

  const addClassToListTags = (html: string) => {
    const options: HTMLReactParserOptions = {
      replace: (domNode) => {
        if (domNode.type === "tag" && domNode.name === "ol") {
          domNode.attribs.class = domNode.attribs.class
            ? `${domNode.attribs.class} list-decimal`
            : "list-decimal";
        }
        if (domNode.type === "tag" && domNode.name === "ul") {
          domNode.attribs.class = domNode.attribs.class
            ? `${domNode.attribs.class} list-disc`
            : "list-disc";
        }
      },
    };
    return parse(html, options);
  };

  const processedValue = addClassToListTags(description);

  return (
    <div className="bg-white">
      <div className="z-[9002] h-screen w-full bg-white dark:bg-dark dark:text-mddark absolute flex flex-col justify-normal">
        <div className="p-4 border-b dark:border-smdark flex items-center gap-4">
          <button
            onClick={() => navigate("/#portfolio")}
            className="text-3xl hover:text-main"
          >
            <IoArrowBackCircle />
          </button>
          <h1 className="text-xl font-bold uppercase">Detile Project</h1>
        </div>
        <div className="w-full h-auto overflow-y-auto bg-white dark:bg-dark">
          {(project && (
            <div className="h-auto max-w-4xl mx-auto bg-white dark:bg-smdark lg:my-10 lg:rounded-3xl border dark:border-smdark overflow-hidden">
              {error && <p>{error}</p>}
              {project !== undefined && project.image.length > 0 && (
                <div
                  style={{
                    backgroundImage: `url(${project?.image?.[0].secure_url})`,
                  }}
                  className="w-full h-40 lg:h-96 bg-cover bg-center hover:cursor-pointer group/visit"
                >
                  <a
                    href={`${project.link_web}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white bg-black bg-opacity-50  items-center justify-center w-full h-full flex -translate-x-full group-hover/visit:translate-x-0 transition-all"
                  >
                    <h1 className="font-semibold">Visit</h1>
                  </a>
                </div>
              )}
              <section className="lg:px-16 px-4 mt-10">
                <a
                  href={`${project.link_web}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-xl lg:text-3xl"
                >
                  {project?.title}
                </a>
                <div className="flex gap-1 my-2">
                {project.tag.split(',').map((t: string,i: number) => (
                  <span className=" text-main py-0.5 px-2 rounded-lg bg-mddark text-xs" key={i}>{t}</span>
                ))}
                </div>
                <h5 className="text-sm text-secondary">
                  Publis in {project?.createdAt}
                </h5>

                <div className="my-10 text-lg">{processedValue}</div>
              </section>
            </div>
          )) || (
            <div className="p-4 h-auto max-w-2xl mx-auto my-10">
              <div
                role="status"
                className="h-96 w-full mt-10 mx-auto flex items-center justify-center bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700"
              >
                <svg
                  className="w-10 h-10 text-gray-200 dark:text-gray-600"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 20"
                >
                  <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                  <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM9 13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2Zm4 .382a1 1 0 0 1-1.447.894L10 13v-2l1.553-1.276a1 1 0 0 1 1.447.894v2.764Z" />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>

              <Paragraph />
            </div>
          )}
        </div>
      </div>
      <footer id="footer" className="pt-24 pb-12 bg-dark">
        <Footer />
      </footer>{" "}
    </div>
  );
};

export default DetileProject;
