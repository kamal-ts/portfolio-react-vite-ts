import React, { useEffect, useState } from "react";
import { useAuth } from "../Auth/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Admin: React.FC = () => {
  const { token, logout } = useAuth();
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
    getUser();
  }, []);

  return (
    <section className="bg-lgdark w-full h-screen flex flex-col justify-center ">
      <div className="bg-white shadow-lg rounded-lg max-w-96 w-full h-screen md:h-auto mx-auto text-secondary overflow-hidden">
        <div className="px-6 py-4 border-b text-main">
        <h1 className="text-xl font-bold">Admin Page</h1>
        </div>
        
        {token ? (
          <div className="flex flex-col gap-6 p-6">
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
