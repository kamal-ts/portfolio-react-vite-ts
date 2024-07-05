import { useState } from "react";
import { IoChevronDown } from "react-icons/io5";
import Sidebar from "../Sidebar/Sidebar";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [hamburger, setHamburger] = useState(false);

  const handleMenu = () => {
    setHamburger(!hamburger);
  };
  return (
    <header className="">
      <nav
        className={`w-full h-16 fixed bg-white text-smdark top-0 border-b flex items-center justify-between`}
      >
        <section
          className={`h-16 max-w-60 flex items-center gap-4 transition-all px-6 `}
        >
          <button
            id="hamburger"
            onClick={handleMenu}
            name="hamburger"
            type="button"
            className={`block lg:hidden`}
          >
            <span
              className={`hamburger-line transition duration-300 ease-in-out origin-top-left ${
                hamburger ? "rotate-45" : ""
              }`}
            ></span>
            <span
              className={`hamburger-line transition duration-300 ease-in-out ${
                hamburger ? "scale-0" : ""
              }`}
            ></span>
            <span
              className={`hamburger-line transition duration-300 ease-in-out origin-bottom-left ${
                hamburger ? "-rotate-45" : ""
              }`}
            ></span>
          </button>
          <h1 className="text-main font-bold text-2xl">MProject</h1>
        </section>
        {/* <section className="bg-red-200">
        
      </section> */}
        <section className="px-6 flex items-center gap-3 hover:text-main cursor-pointer">
          <div className="text-lg">
            <FaUserCircle />
          </div>
          <div className="flex items-center gap-1">
            <p className="">Kamal</p>
            <IoChevronDown />
          </div>
        </section>
      </nav>
      <Sidebar status={hamburger}/>
    </header>
  );
};

export default Navbar;
