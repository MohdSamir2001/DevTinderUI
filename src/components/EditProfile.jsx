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
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
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
          age,
          gender,
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
    <div className="flex gap-4 justify-center">
      <div className="w-80 bg-base-300 p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl text-center mb-4 font-semibold">
          Edit Profile
        </h1>
        <form onClick={(e) => e.preventDefault()} className="flex flex-col">
          <label htmlFor="photoUrl" className="font-semibold">
            Photo URL:
          </label>
          <input
            className="p-3 outline-none font-semibold rounded-md mb-4 "
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
            type="text"
          />

          <label htmlFor="firstName" className="font-semibold">
            First Name:
          </label>
          <input
            className="p-3 outline-none font-semibold rounded-md mb-4 "
            value={firstName}
            onClick={() => setError("")}
            onChange={(e) => setFirstName(e.target.value)}
            type="text"
          />

          <label htmlFor="lastName" className="font-semibold">
            Last Name:
          </label>
          <input
            className="p-3 outline-none font-semibold rounded-md mb-4 "
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            type="text"
          />

          <label htmlFor="skills" className="font-semibold">
            Skills:
          </label>
          <input
            className="p-3 outline-none font-semibold rounded-md mb-4 "
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            type="text"
          />

          <label htmlFor="gender" className="font-semibold">
            Gender:
          </label>
          <select
            className="p-3 outline-none font-semibold rounded-md mb-4 "
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>
          </select>

          <label htmlFor="age" className="font-semibold">
            Age:
          </label>
          <input
            className="p-3 outline-none font-semibold rounded-md mb-4 "
            value={age}
            onChange={(e) => setAge(e.target.value)}
            type="number"
            placeholder="Enter your age"
          />

          <label htmlFor="about" className="font-semibold">
            About:
          </label>
          <textarea
            className="p-3 outline-none font-semibold rounded-md mb-4 "
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder="Tell us about yourself"
          />

          <p className="font-semibold text-sm text-red-500">{error}</p>
          <button
            onClick={saveProfile}
            className="p-4 mt-2 bg-violet-800 text-white font-semibold rounded-md shadow-md hover:bg-violet-600 transition duration-300"
          >
            Save Profile
          </button>
        </form>
      </div>

      <div className="bg-base-200 w-80 rounded-md shadow-md overflow-hidden font-semibold">
        <img className="w-full h-96 object-fill" src={photoUrl} alt="Profile" />
        <div className="p-4">
          <h1 className="text-center text-2xl">{firstName + " " + lastName}</h1>
          <div className="bg-base-200 border-b-[1px] text-center p-2">
            <h2>Skills</h2>
          </div>
          <p className="p-2 text-center">{skills}</p>

          <div className="bg-base-200 border-b-[1px] text-center p-2">
            <h2>About</h2>
          </div>
          <p className="p-2">{about}</p>
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
