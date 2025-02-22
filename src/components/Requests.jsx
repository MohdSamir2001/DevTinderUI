import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/requestsSlice";
import UserTile from "./UserTile";

const Requests = () => {
  const allRequests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const fetchAllRequests = async () => {
    if (allRequests.length > 0) return;
    const res = await axios.get(BASE_URL + "/user/requests/recieved", {
      withCredentials: true,
    });
    dispatch(dispatch(addRequests(res?.data?.data)));
  };
  useEffect(() => {
    fetchAllRequests();
  });
  return allRequests.length === 0 ? (
    <p className="text-center text-gray-400">You have no requests yet.</p>
  ) : (
    <div className="mt-4">
      <h1 className="text-center font-semibold mb-4 text-3xl">
        My Requests...
      </h1>
      {allRequests.map((request, index) => {
        return <UserTile key={index} connection={request?.fromUserId} />;
      })}
    </div>
  );
};

export default Requests;
