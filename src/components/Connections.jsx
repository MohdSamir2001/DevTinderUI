import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionsSlice";
import UserTile from "./UserTile";
import { Link } from "react-router-dom";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);

  const fetchConnections = async () => {
    if (connections.length > 0) return;

    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });

      const connection = res?.data?.data || [];
      dispatch(addConnections(connection));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  return (
    <div className="w-full px-4">
      <h1 className="text-center font-semibold my-4 text-3xl text-white">
        My Connections
      </h1>

      <div className="space-y-3 mx-40">
        {connections.length === 0 ? (
          <p className="text-center text-gray-400">
            You have no connections yet.
          </p>
        ) : (
          connections.map((connection, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-slate-700 rounded-md p-2"
            >
              <div className="w-full">
                <UserTile connection={connection} />
              </div>
              <Link to={`/chat/${connection._id}`}>
                <button className="ml-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold">
                  Chat
                </button>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Connections;
