import React, { useState, FormEvent } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { API_USER_ENDPOINTS } from "../../../util/apiConfig";
import SubmitButton from "../../common/Button/SubmitButton";

const Login: React.FC = () => {
  const location = useLocation();
  const { restUsername } = location.state ? location.state : "";

  const [username, setUsername] = useState<string>(
    restUsername ? restUsername : ""
  );
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  interface error {
    errors: string | unknown;
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
      navigate("/admin", { state: { notifFromLogin: true } });
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data.errors) {
        setError(err.response.data.errors);
      } else {
        setError("An unexpected error occurred.");
      }
      // setError("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = () => {
    navigate("/register");
  };

  return (
    <form
      className="bg-lgdark w-full h-screen text-smdark flex flex-col justify-center"
      onSubmit={handleSubmit}
    >
      <div className="bg-white max-w-96 h-screen md:h-auto w-full p-10 mx-auto shadow-xl rounded-lg flex flex-col gap-4 border">
        <h1 className="text-2xl font-semibold mb-4">Sign in to your account</h1>
        {error && (
          <section className="bg-red-100 text-red-500 p-2 rounded-md">
            <p>{error}!</p>
          </section>
        )}
        <div className="flex flex-col w-full justify-between gap-2">
          <label className="text-sm">Username</label>
          <input
            className="border w-full rounded-md h-12 p-2 bg-lgdark"
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
            className="border w-full rounded-md h-12 p-2 bg-lgdark"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <SubmitButton
          isLoading={isLoading}
          title="Sign in"
          titleProses="Sign in..."
        />
        <p className="text-secondary font-light text-sm text-center">
          Don’t have an account yet?{" "}
          <button className="text-main font-semibold" onClick={handleSignup}>
            Sign up
          </button>
        </p>
      </div>
    </form>
  );
};

export default Login;
