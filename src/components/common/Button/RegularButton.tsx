import React from "react";

const RegularButton: React.FC<{
  Bgcolor?: string;
  color?: string;
  onClick: () => void;
  titleProses?: string | null;
  title: string;
  isLoading?: boolean;
  borderColor?: string;
}> = ({
  title,
  color = "#ffffff",
  Bgcolor = "#6366f1",
  onClick,
  titleProses = null,
  isLoading = false,
  borderColor,
}) => {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: Bgcolor,
        color,
        borderWidth: "1px",
        borderColor: borderColor ? borderColor : Bgcolor,
      }}
      className={`w-full py-3 px-4 text-sm font-bold border rounded-3xl hover:contrast-150 hover:shadow-lg transition-all hover:-translate-y-1 hover:scale-110 ${
        isLoading ? "cursor-wait" : ""
      }`}
      disabled={isLoading}
    >
      {isLoading ? (titleProses === null ? title : titleProses) : title}
    </button>
  );
};

export default RegularButton;
