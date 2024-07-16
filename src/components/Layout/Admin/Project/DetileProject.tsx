import React, { useEffect, useState } from "react";
import { IoArrowBackCircle } from "react-icons/io5";
import { ProjectType } from "./interface";
import axios from "axios";
import { API_MYPROJECT_ENDPOINTS } from "../../../../util/apiConfig";
import Paragraph from "../../../common/Skeleton/Paragraph";

const DetileProject: React.FC<{
  idProject: string;
  handleEvents: (e: string) => void;
  token: string | null;
}> = ({ idProject, handleEvents, token }) => {
  const [product, setProduct] = useState<ProjectType>();
  const [error, setError] = useState("");
  const [tag, setTag] = useState<string[]>();
  const [description, setDescription] = useState("");

  useEffect(() => {
    const getSingleProduct = async () => {
      try {
        const result = await axios.get(
          API_MYPROJECT_ENDPOINTS + "/" + idProject,
          {
            headers: { Authorization: token },
          }
        );
        setTag(result.data.data.tag.split(","));
        console.log("tag", tag);
        setDescription(result.data.data.description);
        setProduct(result.data.data);
      } catch (error) {
        setError("Failed");
      }
    };
    getSingleProduct();
  }, [idProject, token]);

  return (
    <div className="z-[9002] h-screen w-full bg-white dark:bg-dark absolute flex flex-col justify-normal">
      <div className="p-4 border-b flex items-center gap-4">
        <button
          onClick={() => handleEvents("list")}
          className="text-3xl hover:text-main"
        >
          <IoArrowBackCircle />
        </button>
        <h1 className="text-xl font-bold uppercase">Detile Product</h1>
      </div>
      <div className="w-full h-auto overflow-y-auto">
        {(product && (
          <div className="p-4 h-auto max-w-2xl mx-auto ">
            {error && <p>{error}</p>}
            <h1 className="font-semibold text-3xl">{product?.title}</h1>
            <h5 className="text-sm text-main">{product?.tag}</h5>
            <h5 className="text-sm text-secondary">
              Publis in {product?.createdAt}
            </h5>
            {product !== undefined && product.image.length > 0 && (
              <img
                src={product?.image?.[0].secure_url}
                alt="image product"
                className="h-96 w-full mt-10 mx-auto rounded-lg"
              />
            )}

            <div
              className="my-10 text-lg text-justify"
              dangerouslySetInnerHTML={{ __html: description }}
            />
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
  );
};

export default DetileProject;
