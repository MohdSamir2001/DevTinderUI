import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import { FaHeart } from "react-icons/fa";
const Navbar = () => {
  const user = useSelector((store) => store.user);
  const allRequests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="navbar px-6 bg-base-200">
      <div className="flex-1 relative justify-between">
        {allRequests.length > 0 && user && (
          <h1 className="absolute w-4 h-4 flex justify-center text-black items-center right-4 text-xs font-bold bg-white p-1 rounded-full top-1">
            {allRequests.length}
          </h1>
        )}
        <Link
          to={user ? "/" : "login"}
          className="btn btn-ghost font-semibold text-2xl"
        >
          DevTinderUI
        </Link>
        {user && (
          <Link to="/requests" className="btn mr-4 btn-ghost font-semibold">
            <FaHeart className="scale-[180%] text-pink-600" />
          </Link>
        )}
      </div>
      <div className="flex-none gap-2">
        <div className="dropdown font-semibold dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            {user && (
              <div className="w-10 rounded-full">
                <img alt="userphoto" src={user.photoUrl} />
              </div>
            )}
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/profile" className="justify-between">
                Profile
                <span className="badge">New</span>
              </Link>
            </li>
            <li>
              <Link to="/connections">Connections</Link>
            </li>
            <li>
              <a onClick={handleLogout}>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
