import React, { useEffect, useState } from "react";
import { IoArrowBackCircle } from "react-icons/io5";
import { ProjectType } from "./interface";
import axios from "axios";
import { API_MYPROJECT_ENDPOINTS } from "../../../../util/apiConfig";

const DetileProject: React.FC<{
  idProject: string;
  handleEvents: (e: string) => void;
  token: string | null;
}> = ({ idProject, handleEvents, token }) => {
  const [product, setProduct] = useState<ProjectType>();
  const [error, setError] = useState("");
  const [tag, setTag] = useState<string[]>()

  
  useEffect(() => {
      const getSingleProduct = async () => {
        try {
          const result = await axios.get(
            API_MYPROJECT_ENDPOINTS + "/" + idProject,
            {
              headers: { Authorization: token },
            }
          );
          const tag = result.data.data.tag.split(",");
          setTag(tag);
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
        <div className="p-4 h-auto max-w-3xl mx-auto ">
          {error && <p>{error}</p>}
          <h1 className="font-semibold my-4 text-2xl">{product?.title}</h1>
          {product !== undefined && product.image.length > 0 && (
            <img
              src={product?.image?.[0].secure_url}
              alt="image product"
              className="h-96 w-full mt-10 mx-auto rounded-lg"
            />
          )}
          <h4>{product?.category}</h4>
          {tag?.map((e, i) => (

          <h5 key={i} className="my-4">{e}</h5>
          ))}
          <h5 className="text-blue-600">{product?.link_git}</h5>
          <h5 className="text-blue-600">{product?.link_web}</h5>
          <p className="text-justify text-lg my-4">{product?.description}</p>
        </div>
      </div>
    </div>
  );
};

export default DetileProject;
