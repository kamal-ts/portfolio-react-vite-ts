import { BiLogOutCircle, BiSolidDashboard, BiSolidData, BiSolidLogOut, BiSolidLogOutCircle } from "react-icons/bi";

const Sidebar = () => {
  const menu = [
    {
      title: "Dashboard",
      icon: <BiSolidDashboard />,
      link: "",
    },
    {
      title: "Project",
      icon: <BiSolidData />,
      link: "",
    },
    {
      title: "Logout",
      icon: <BiSolidLogOutCircle />,
      link: "",
    },
  ];

  return (
    <aside className="bg-white max-w-60 w-full h-screen absolute text-secondary top-16">
      <section className=" flex flex-col mt-4">
        {menu.map((m, index) => (
          <div
            key={index}
            className=" py-3 px-6 hover:text-main hover:font-bold cursor-pointer transition-all duration-150 flex items-center gap-x-4"
          >
            <span className="text-xl ">{m.icon}</span>
            <span>{m.title}</span>
          </div>
        ))}
      </section>
    </aside>
  );
};

export default Sidebar;
