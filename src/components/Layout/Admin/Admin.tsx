import React, { useEffect, useState } from "react";
import { useAuth } from "../Auth/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Admin: React.FC = () => {
  const { token, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  type data = {
    username: string;
    name: string;
  };
  const [user, setUser] = useState<data>();
  const [error, setError] = useState<string | null>(null);

  const getUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const user = await axios.get(
        "https://my-portfolio-backend-express.vercel.app/api/users/current",
        { headers: { Authorization: `${token}` } }
      );
      console.log("user", user);
      setUser(user.data.data);
    } catch (error) {
      setError("cannot find token");
    }
  };

  useEffect(() => {
    if (location.state && location.state.notifFromLogin) {
      toast.success("Anda berhasil login!");
    }
    getUser();

  }, [location]);

  return (
    <section
      className=" absolute top-16 lg:left-72 lg:w-auto w-full h-auto lg:p-4 "
    >
      <div className="bg-white shadow-lg rounded-sm px-4 py-4 lg:h-auto text-smdark overflow-hidden">
        <div className=" py-4">
          <h1 className="text-xl font-bold">Admin Page</h1>
        </div>
        
        {token ? (
          <div className="flex flex-col gap-6">
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores quibusdam consequuntur explicabo beatae similique, aperiam earum et aut tempora! Ratione, veritatis aut. Nihil doloremque ipsa sequi minus dolores, at odit?</p>
            <div className="">
              <p>Nama : {user?.name}</p>
              <p>Username : {user?.username}</p>
            </div>
            <p className="text-xs">Your token: {token}</p>
            <button
              className="bg-main text-white font-semibold rounded-md h-12 mt-6"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <p>You are not logged in.</p>
            <p>{error}</p>
          </>
        )}
      </div>
    </section>
  );
};

export default Admin;
