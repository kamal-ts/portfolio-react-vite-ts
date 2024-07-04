import React, { useState, FormEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_USER_ENDPOINTS } from "../../../util/apiConfig";
import SubmitButton from "../../common/Button/SubmitButton";

const Register: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await axios.post(API_USER_ENDPOINTS.REGISTER, {
        name,
        username,
        password,
      });
      // Setelah registrasi berhasil, redirect ke halaman login
      console.log('first', result.data.data.username)
      navigate("/login", {
        state: {
          restUsername: result.data.data.username,
        },
      });
    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSign = () => {
    navigate("/login");
  };
  return (
    <form
      className="bg-lgdark w-full h-screen text-smdark flex flex-col justify-center"
      onSubmit={handleSubmit}
    >
      <div className="bg-white max-w-96 h-screen md:h-auto w-full p-10 mx-auto shadow-xl rounded-lg flex flex-col gap-4 border">
        <h1 className="text-2xl font-semibold mb-4">Create your account</h1>
        {error && (
          <section className="bg-red-100 text-red-500 p-2 rounded-md">
            <p>{error}!</p>
          </section>
        )}
        <div className="flex flex-col w-full justify-between gap-2">
          <label className="text-sm">Name</label>
          <input
            className="border w-full rounded-md h-12 p-2 bg-lgdark"
            type="text"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col w-full justify-between gap-2">
          <label className="text-sm">Username</label>
          <input
            className="border w-full rounded-md h-12 p-2 bg-lgdark"
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col w-full justify-between gap-2">
          <label className="text-sm">Password</label>
          <input
            className="border w-full rounded-md h-12 p-2 bg-lgdark"
            type="password"
            placeholder="passsword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <SubmitButton
          isLoading={isLoading}
          title="Signup"
          titleProses="Signup..."
        />
        <p className="text-secondary font-light text-sm text-center">
          Already have an account yet?{" "}
          <button className="text-main font-semibold" onClick={handleSign}>
            Sign
          </button>
        </p>
      </div>
    </form>
  );
};

export default Register;
