import React, { SetStateAction, useEffect, useState } from "react";
import {
  BiSolidDashboard,
  BiSolidData,
  BiSolidLogOutCircle,
} from "react-icons/bi";
import { FaHashtag } from "react-icons/fa";

const Sidebar: React.FC<{status: boolean}> = ({status}) => {
  


  const [activeMenu, setActiveMenu] = useState<string | null>("dashboard");

  const handleMenu = (e: SetStateAction<string | null>) => {
    setActiveMenu(e);
  };

  const menu = [
    {
      title: "dashboard",
      icon: <BiSolidDashboard />,
      link: "",
    },
    {
      title: "project",
      icon: <BiSolidData />,
      link: "",
    },
    {
      title: "tag",
      icon: <FaHashtag />,
      link: "",
    },
  ];

  const [windowDimensions, setWindowDimensions] = useState({

    width: window.innerWidth,

    height: window.innerHeight,

  });


  useEffect(() => {

    const handleResize = () => {

      setWindowDimensions({

        width: window.innerWidth,

        height: window.innerHeight,

      });

    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);

  }, []);

  return (
    <aside
    style={{
      height: windowDimensions.height - 64
    }}
      className={`max-w-60 w-full absolute text-secondary bg-white top-16 border-r lg:visible ${!status? "invisible": ""} transition-all duration-200`}
    >
      <div id="side" className="flex flex-col justify-between h-full">
          <section className="px-8">
            <div className="py-2 px-4 mt-4 ">
              <h4 className="text-xs font-semibold text-mddark">MENU</h4>
            </div>
            {menu.map((m, index) => (
              <div
                onClick={() => handleMenu(m.title)}
                key={index}
                className={`${
                  activeMenu === m.title ? "bg-xldark text-main" : ""
                } hover:bg-xldark py-2 px-4 mt-1 rounded-lg cursor-pointer flex items-center gap-x-4 transition-all duration-200 capitalize`}
              >
                <span className="text-base">{m.icon}</span>
                <span>{m.title}</span>
              </div>
            ))}
          </section>
        <section>
          <div className=" py-3 px-6 border-t hover:text-main hover:font-bold cursor-pointer transition-all duration-150 flex items-center gap-x-4">
            <span className="text-xl ">
              <BiSolidLogOutCircle />
            </span>
            <span>Logout</span>
          </div>
        </section>
      </div>
    </aside>
  );
};

export default Sidebar;
