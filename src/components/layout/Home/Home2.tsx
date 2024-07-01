import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  type data = {
    username: string;
    name: string;
  };
  const [user, setUser] = useState<data>();
  const [error, setError] = useState<string | null>(null);

  const getUser = async () => {
    try {
        const token = localStorage.getItem('token');
      const user = await axios.get(
        "https://my-portfolio-backend-express.vercel.app/api/users/current",
        { headers: {"Authorization" : `${token}`} }
      );
      console.log('user', user)
      setUser(user.data.data);
    } catch (error) {
      setError("cannot find token");
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <nav>
        <Link to="/login">Login</Link> | <Link to="/register">Register</Link> |{" "}
        <Link to="/protected">Protected Page</Link>
      </nav>
      {error !== null && <h1>{error}</h1> || (
        <div>
          <p>Nama : {user?.name}</p>
          <p>Username : {user?.username}</p>
        </div>
      )}
    </div>
  );
};

export default Home;
