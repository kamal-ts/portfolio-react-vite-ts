import React, { useEffect, useState } from "react";
import {
  BiSolidDashboard,
  BiSolidData,
  BiSolidLogOutCircle,
} from "react-icons/bi";
import {  FaUserAlt, } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../Layout/Auth/AuthContext";

const Sidebar: React.FC<{status: boolean}> = ({status}) => {
  const navigate = useNavigate();

  interface Menu {
    title: string | null,
    icon: JSX.Element | null,
    link: string | null,
  }
  const handleMenu = (e: Menu) => {
    navigate(`${e.link}`);
  };

  // to get path url
  const location = useLocation()

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
      title: "profile",
      icon: <FaUserAlt />,
      link: "/admin/profile",
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

  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside
    style={{
      height: windowDimensions.height - 64
    }}
      className={`z-[9000] max-w-60 lg:max-w-72 w-full fixed text-smdark dark:text-secondary bg-white dark:bg-dark top-16 transform lg:transform-none  ${status? "translate-x-0" : "-translate-x-full"} transition-transform duration-200 `}
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
                  ( m.link === location.pathname) ? "bg-xldark dark:bg-smdark text-main" : ""
                } hover:bg-xldark dark:hover:bg-smdark py-2 px-4 mt-1 rounded-lg cursor-pointer flex items-center gap-x-4 transition-all duration-200 capitalize`}
              >
                <span className="text-2xl">{m.icon}</span>
                <span>{m.title}</span>
              </div>
            ))}
          </section>
        <section>
          <div 
          onClick={handleLogout}
          className=" py-3 px-12 border-t dark:border-t-smdark hover:text-main cursor-pointer transition-all duration-150 flex items-center gap-x-4">
            <span className="text-2xl ">
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
