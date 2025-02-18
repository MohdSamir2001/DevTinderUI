import axios from "axios";
import React, { useState } from "react";
const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:7860/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="flex h-96 justify-center items-center">
      <div className="w-96 mt-28 py-8 px-4 rounded-md bg-black bg-opacity-10 flex justify-center flex-col ">
        <h1 className="text-2xl font-semibold text-center mb-8">
          Login Here...
        </h1>
        <form onClick={(e) => e.preventDefault()} className="flex flex-col">
          <input
            className="p-4 outline-none font-semibold rounded-md mb-2"
            type="text"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
            placeholder="Enter your email..."
          />
          <input
            className="p-4 outline-none font-semibold rounded-md "
            type="text"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Enter your password..."
          />
          <button
            onClick={handleLogin}
            className="p-4 btn btn-ghost mt-2 bg-black bg-opacity-60 font-semibold rounded-md"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
