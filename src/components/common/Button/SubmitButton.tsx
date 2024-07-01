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
      className={`bg-main text-white font-semibold rounded-md h-12 mt-6 ${
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
