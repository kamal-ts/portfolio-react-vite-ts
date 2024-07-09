import React from "react";

const RegularButton: React.FC<{
  Bgcolor?: string;
  color?: string;
  onClick: () => void;
  titleProses?: string | null;
  title: string;
  isLoading?: boolean;
}> = ({
  title,
  color = "#ffffff",
  Bgcolor = "#6366f1",
  onClick,
  titleProses = null,
  isLoading = false,
}) => {
  return (
    <button
      onClick={onClick}
      style={{ backgroundColor: Bgcolor, color }}
      className={`w-full py-3 px-4 text-sm font-bold rounded-3xl ${
        isLoading ? "cursor-wait" : ""
      }`}
      disabled={isLoading}
    >
      {isLoading ? (titleProses === null ? title : titleProses) : title}
    </button>
  );
};

export default RegularButton;
