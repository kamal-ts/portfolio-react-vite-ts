import React, { useState } from "react";

const SpeedMenu: React.FC<{
    handleEvents: (e: string) => void;
    idProject: string
}> = ({
  handleEvents,
  idProject
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div data-dial-init className="fixed end-6 bottom-6 group">
      <div
        id="speed-dial-menu-click"
        className={`${
          open ? "flex" : "hidden"
        } flex-col items-center mb-4 space-y-2`}
      >
        <button
          type="button"
          data-tooltip-target="tooltip-share"
          data-tooltip-placement="left"
          className="flex justify-center items-center w-[52px] h-[52px] text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 dark:border-gray-600 shadow-sm dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400"
        >
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 18 18"
          >
            <path d="M14.419 10.581a3.564 3.564 0 0 0-2.574 1.1l-4.756-2.49a3.54 3.54 0 0 0 .072-.71 3.55 3.55 0 0 0-.043-.428L11.67 6.1a3.56 3.56 0 1 0-.831-2.265c.006.143.02.286.043.428L6.33 6.218a3.573 3.573 0 1 0-.175 4.743l4.756 2.491a3.58 3.58 0 1 0 3.508-2.871Z" />
          </svg>
          <span className="sr-only">Share</span>
        </button>
        <button
        
          type="button"
          data-tooltip-target="tooltip-share"
          data-tooltip-placement="left"
          className="flex justify-center items-center w-[52px] h-[52px] text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 dark:border-gray-600 shadow-sm dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400"
          onClick={() => handleEvents("edit/"+idProject)}
        >
          <svg
            className="w-7 h-7"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fill-rule="evenodd"
              d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z"
              clip-rule="evenodd"
            />
            <path
              fill-rule="evenodd"
              d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z"
              clip-rule="evenodd"
            />
          </svg>

          <span className="sr-only">Edit</span>
        </button>
        <div
          id="tooltip-share"
          role="tooltip"
          className="absolute z-10 invisible inline-block w-auto px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
        >
          Edit
          <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
      </div>
      <button
        onClick={() => setOpen(!open)}
        type="button"
        data-dial-toggle="speed-dial-menu-click"
        data-dial-trigger="click"
        aria-controls="speed-dial-menu-click"
        aria-expanded="false"
        className="flex items-center justify-center text-white bg-blue-700 rounded-full w-14 h-14 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800"
      >
        <svg
          className="w-6 h-6 text-white dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-width="3"
            d="M12 6h.01M12 12h.01M12 18h.01"
          />
        </svg>

        <span className="sr-only">Open actions menu</span>
      </button>
    </div>
  );
};

export default SpeedMenu;
