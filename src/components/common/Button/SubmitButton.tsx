import React from "react";

interface buttonType {
  isLoading: boolean;
  title: string;
  titleProses: string;
}

const SubmitButton: React.FC<buttonType> = ({
  isLoading = false,
  title,
  titleProses,
}) => {
  return (
    <button
      className={`bg-main text-white font-semibold rounded-md w-full h-12 hover:shadow-lg hover:opacity-80 transition duration-300 ease-in-out ${
        isLoading ? "cursor-wait" : ""
      }`}
      type="submit"
      disabled={isLoading}
    >
      {isLoading ? titleProses : title}
    </button>
  );
};

export default SubmitButton;
