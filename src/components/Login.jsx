import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
const Login = () => {
  const [emailId, setEmailId] = useState("riya123@gmail.com");
  const [password, setPassword] = useState("@Riya123");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };
  return (
    <div className="flex h-96 justify-center items-center">
      <div className="w-96 mt-28 py-8 px-4 rounded-lg bg-black bg-opacity-10 flex justify-center flex-col ">
        <h1 className="text-2xl font-semibold text-center mb-8">
          Login Here...
        </h1>
        <form onClick={(e) => e.preventDefault()} className="flex flex-col">
          <input
            className="p-4 outline-none font-semibold rounded-md mb-2"
            type="text"
            value={emailId}
            onClick={() => setError("")}
            onChange={(e) => setEmailId(e.target.value)}
            placeholder="Enter your email..."
          />
          <input
            className="p-4 outline-none font-semibold rounded-md "
            type="text"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            onClick={() => setError("")}
            placeholder="Enter your password..."
          />
          <p className="font-semibold mt-2 text-sm text-red-500">{error}</p>
          <button
            onClick={handleLogin}
            className="p-4 btn btn-ghost mt-2 bg-violet-800  font-semibold rounded-md"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
