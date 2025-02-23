import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
const SignAndLogin = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
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
  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };
  return (
    <div className="flex h-96 justify-center items-center">
      <div className="w-96 mt-52 py-8 px-4 rounded-lg bg-black bg-opacity-10 flex justify-center flex-col ">
        <h1 className="text-2xl font-semibold text-center mb-8">
          {isLoginForm ? "Login Here..." : "Sign Up Here..."}
        </h1>
        <form onClick={(e) => e.preventDefault()} className="flex flex-col">
          {!isLoginForm && (
            <input
              className="p-4 outline-none font-semibold rounded-md mb-2"
              type="text"
              value={firstName}
              onClick={() => setError("")}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
            />
          )}
          {!isLoginForm && (
            <input
              className="p-4 mb-2 outline-none font-semibold rounded-md "
              type="text"
              value={lastName}
              onClick={() => setError("")}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
            />
          )}
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
            onClick={isLoginForm ? handleLogin : handleSignUp}
            className="p-4 btn btn-ghost mt-2 bg-violet-800  font-semibold rounded-md"
          >
            {isLoginForm ? "Login" : "Sign In"}
          </button>
          <div className="flex items-center justify-center gap-2 mt-4">
            {isLoginForm ? (
              <p>If you don't have account:</p>
            ) : (
              <p>If you have already account:</p>
            )}
            <p
              onClick={() => setIsLoginForm(!isLoginForm)}
              className="font-semibold cursor-pointer p-2"
            >
              {isLoginForm ? "Sign Up" : "Log In"}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignAndLogin;
