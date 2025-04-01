import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";
import { FaHeart, FaTimes, FaInfoCircle } from "react-icons/fa";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const [showInfo, setShowInfo] = useState(false);

  const handleSendRequest = async (status, toUserId) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${toUserId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeFeed(toUserId));
    } catch (err) {
      console.log(err);
    }
  };

  const { about, firstName, lastName, photoUrl, skills, _id, age, gender } =
    user;

  return (
    <div className="relative w-80 mt-16 bg-slate-800 shadow-2xl rounded-xl overflow-hidden text-white">
      {/* Profile Image with Dark Overlay */}
      <div className="relative">
        <img
          className="w-full h-96 object-cover"
          src={photoUrl}
          alt="Profile"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

        {/* Info Icon */}
        <button
          className="absolute top-3 right-3 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
          onClick={() => setShowInfo(!showInfo)}
        >
          <FaInfoCircle size={22} />
        </button>
      </div>

      {/* User Details
      <div className="absolute bottom-24 left-0 w-full p-4 text-center">
        <h1 className="text-lg font-semibold">
          {firstName} {lastName}
        </h1>
      </div> */}

      {/* Action Buttons */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-12">
        <button
          onClick={() => handleSendRequest("ignored", _id)}
          className="bg-red-500 text-white p-5 rounded-full shadow-lg hover:bg-red-700 transition-all transform hover:scale-110"
        >
          <FaTimes size={30} />
        </button>
        <button
          onClick={() => handleSendRequest("interested", _id)}
          className="bg-green-500 text-white p-5 rounded-full shadow-lg hover:bg-green-700 transition-all transform hover:scale-110"
        >
          <FaHeart size={30} />
        </button>
      </div>

      {/* Slide-In Info Panel */}
      <div
        className={`fixed top-0 font-semibold right-0 h-full w-80 bg-white text-gray-900 shadow-lg transition-transform transform ${
          showInfo ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-5 relative">
          {/* Close Button */}
          <button
            onClick={() => setShowInfo(false)}
            className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full hover:bg-red-700 transition"
          >
            <FaTimes size={22} />
          </button>

          {/* Info Content */}
          <h2 className="text-xl font-bold text-gray-800">
            {firstName} {lastName}
          </h2>
          <p className="text-sm text-gray-700 mt-2">
            {about || "No description available."}
          </p>

          <h3 className="mt-4 font-semibold text-gray-800">Skills</h3>
          <p className="text-sm text-gray-700">
            {skills.length ? skills.join(", ") : "No skills listed."}
          </p>
          <h3 className="mt-4 font-semibold text-gray-800">Age</h3>
          <p className="text-sm text-gray-700">{age}</p>
          <h3 className="mt-4 font-semibold text-gray-800">Gender</h3>
          <p className="text-sm text-gray-700">
            {gender.charAt(0).toUpperCase() + gender.slice(1)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
