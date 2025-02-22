import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionsSlice";
import UserTile from "./UserTile";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const fetchConnections = async () => {
    if (connections.length > 0) return; // Check if it's already fetched

    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });

      const connection = res?.data?.data || []; // Ensure it's always an array

      dispatch(addConnections(connection)); // Dispatch empty array if no connections
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  return (
    <div>
      <h1 className="text-3xl text-center my-4">My Connections</h1>
      {connections.length === 0 ? (
        <p className="text-center text-gray-400">
          You have no connections yet.
        </p>
      ) : (
        connections.map((connection, index) => {
          return <UserTile key={index} connection={connection} />;
        })
      )}
    </div>
  );
};

export default Connections;
