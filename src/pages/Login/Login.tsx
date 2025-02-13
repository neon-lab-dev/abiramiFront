import React, { useState } from "react";
import { login } from "../../api/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const data = {
      email,
      password,
    };
    try {
      const response = await login(data);
      if (response.status === 200) {
        localStorage.setItem("admin", JSON.stringify(response?.data));
        navigate("/");
        console.log(response);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login Error: Please try again with valid credentials!!!");
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full h-[100vh] flex justify-center items-center bg-primary-40">
      <div className="bg-primary-10 w-[380px] min-h-[300px] flex flex-col p-5 rounded-[20px] items-center ">
        <div className="flex items-center gap-2 p-4 w-full justify-center">
          <img src="/src/assets/icons/logo.svg" alt="" />
          <p className="text-white block text-[16px] leading-5">
            Abirami <br /> Enterprises
          </p>
        </div>
        <h2 className="text-white text-center text-[24px] font-bold mb-4 ">
          Login
        </h2>
        <form
          onSubmit={handleSubmit}
          className="text-white flex flex-col gap-4 w-[80%] "
        >
          <div className="flex justify-between items-center">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="py-1 px-2 rounded-lg outline-none text-black"
            />
          </div>
          <div className="flex justify-between items-center">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="py-1 px-2 rounded-lg outline-none text-black"
            />
          </div>
          <button
            className="w-fit mx-auto py-2 px-5 bg-secondary-130 rounded-lg text-black  "
            type="submit"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
