import React, { useState, FormEvent } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { API_USER_ENDPOINTS } from "../util/apiConfig";

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  interface error {
    errors: string | unknown
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(API_USER_ENDPOINTS.LOGIN, {
        username,
        password,
      });
      console.log("response", response);
      const token = response.data.data.token;
      login(token);
      navigate("/admin");
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data.errors) {
        setError(err.response.data.errors);
      } else {
        setError('An unexpected error occurred.');
      }
      // setError("Login failed. Please check your credentials.");
    } finally { 
      setIsLoading(false);
    }
  };

  return (
    <form
      className="bg-indigo-50 w-full h-screen text-slate-600 flex flex-col justify-center"
      onSubmit={handleSubmit}
    >
      <div className="bg-white max-w-96 h-screen md:h-auto w-full p-10 mx-auto shadow-xl rounded-lg flex flex-col gap-4 border">
        <h1 className="text-center text-2xl font-semibold text-indigo-500 mb-4">
          Login Form
        </h1>
        {error &&
        <section className="bg-red-100 text-red-500 p-2 rounded-md">
        <p>{error}!</p>
        </section> 
        }
        <div className="flex flex-col w-full justify-between gap-2">
          <label className="text-sm">Username</label>
          <input
            className="border w-full rounded-md h-12 p-2"
            placeholder="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col w-full justify-between gap-2">
          <label className="text-sm">Password</label>
          <input
            className="border w-full rounded-md h-12 p-2"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        
          <button
          className="bg-indigo-500 text-white font-semibold rounded-md h-12 my-6"
          type="submit" disabled={isLoading}
          >
          {isLoading ? "Logging in..." : "Login"}
        </button>
        
      </div>
    </form>
  );
};

export default Login;
