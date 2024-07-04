import React, { useEffect, useState } from "react";
import {
  BiSolidDashboard,
  BiSolidData,
  BiSolidLogOutCircle,
} from "react-icons/bi";
import {  FaHashtag, FaUserAlt, } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Sidebar: React.FC<{status: boolean}> = ({status}) => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState<string | null>("dashboard");

  interface Menu {
    title: string | null,
    icon: JSX.Element | null,
    link: string | null,
  }
  const handleMenu = (e: Menu) => {
    setActiveMenu(e.title);
    navigate(`${e.link}`);
  };

  const menu: Array<Menu> = [
    {
      title: "dashboard",
      icon: <BiSolidDashboard />,
      link: "/admin",
    },
    {
      title: "project",
      icon: <BiSolidData />,
      link: "/admin/project",
    },
    {
      title: "tag",
      icon: <FaHashtag />,
      link: "",
    },
    {
      title: "profile",
      icon: <FaUserAlt />,
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
  }, [status]);

  return (
    <aside
    style={{
      height: windowDimensions.height - 64
    }}
      className={`max-w-60 lg:max-w-72 w-full fixed text-smdark bg-white top-16 border-r lg:block ${status? "" : "hidden"} transition-all duration-200`}
    >
      <div id="side" className="flex flex-col justify-between h-full">
          <section className="px-8">
            <div className="py-2 px-4 mt-4 ">
              <h4 className="text-xs font-semibold text-mddark">MENU</h4>
            </div>
            {menu.map((m, index) => (
              <div
                onClick={() => handleMenu(m)}
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
          <div className=" py-3 px-8 border-t hover:text-main cursor-pointer transition-all duration-150 flex items-center gap-x-4">
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
