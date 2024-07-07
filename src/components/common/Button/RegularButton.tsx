import React from "react";

const RegularButton: React.FC<{
  children: string;
  Bgcolor?: string;
  color?: string ;
  onClick: () => void;
}> = ({ children, color = "#ffffff", Bgcolor = "#6366f1", onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{ backgroundColor: Bgcolor, color}}
      className={`w-full py-3 px-4 text-sm font-bold rounded-3xl`}
    >
      {children}
    </button>
  );
};

export default RegularButton;
