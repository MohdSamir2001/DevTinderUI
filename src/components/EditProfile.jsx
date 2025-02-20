import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [skills, setSkills] = useState(user.skills);
  const [about, setAbout] = useState(user.about);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();
  const saveProfile = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          about,
          skills,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      const t = setTimeout(() => {
        setShowToast(false);
      }, 1000);
    } catch (err) {
      setError(err.response.data);
    }
  };
  return (
    <div className="flex gap-2">
      <div className="w-72 bg-base-300 p-4 rounded-lg">
        <h1 className="text-2xl text-center m-4 font-semibold">Edit Profile</h1>
        <form onClick={(e) => e.preventDefault()} className="flex flex-col">
          <label htmlFor="" className="font-semibold">
            Photo URL:
          </label>
          <input
            className="p-2 outline-none font-semibold rounded-md mb-2"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
            type="text"
          />
          <label htmlFor="" className="font-semibold">
            First Name:
          </label>
          <input
            className="p-2 outline-none font-semibold rounded-md mb-2"
            value={firstName}
            onClick={() => setError("")}
            onChange={(e) => setFirstName(e.target.value)}
            type="text"
          />
          <label htmlFor="" className="font-semibold">
            Last Name:
          </label>
          <input
            className="p-2 mb-2 outline-none font-semibold rounded-md"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            type="text"
          />
          <label htmlFor="" className="font-semibold">
            Skills:
          </label>
          <input
            className="p-2 mb-2 outline-none font-semibold rounded-md"
            onChange={(e) => setSkills(e.target.value)}
            value={skills}
            type="text"
          />
          <label htmlFor="" className="font-semibold">
            About:
          </label>
          <textarea
            className="p-2 mb-2 outline-none font-semibold rounded-md"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            type="text-area"
            placeholder=""
          />
          <p className="font-semibold text-sm text-red-500">{error}</p>
          <button
            onClick={saveProfile}
            className="p-4 btn btn-ghost mt-2 bg-violet-800  font-semibold rounded-md"
          >
            Save Profile
          </button>
        </form>
      </div>
      <div className="bg-base-200 w-72 rounded-md overflow-hidden font-semibold">
        <img className="w-full" src={photoUrl} alt="" />
        <div className="p-2">
          <h1 className="text-center text-2xl">{firstName + " " + lastName}</h1>
          <h1 className="bg-base-200 border-b-[1px] text-center p-2">
            -- Skills --
          </h1>
          <h1 className="p-2">{skills}</h1>
          <h1 className="bg-base-200 border-b-[1px] text-center p-2">
            -- About --
          </h1>
          <h1 className="p-2">{about}</h1>
        </div>
      </div>
      {showToast && (
        <div className="toast toast-top toast-end">
          <div className="alert alert-success">
            <span className="text-white font-semibold">
              Profile saved successfully.
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
