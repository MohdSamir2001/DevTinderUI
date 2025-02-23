import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestsSlice";
import UserTile from "./UserTile";

const Requests = () => {
  const allRequests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const reviewRequest = async (status, requestId) => {
    try {
      await axios.post(
        BASE_URL + "/request/review/" + status + "/" + requestId,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(requestId));
    } catch (err) {
      console.log(err);
    }
  };
  const fetchAllRequests = async () => {
    if (allRequests.length > 0) return;
    const res = await axios.get(BASE_URL + "/user/requests/recieved", {
      withCredentials: true,
    });
    dispatch(dispatch(addRequests(res?.data?.data)));
  };
  useEffect(() => {
    fetchAllRequests();
  }, []);
  return allRequests.length === 0 ? (
    <div className="mt-4">
      <h1 className="text-center font-semibold mb-4 text-3xl">
        My Requests...
      </h1>
      <p className="text-center text-gray-400">You have no requests yet.</p>
    </div>
  ) : (
    <div className="mt-4">
      <h1 className="text-center font-semibold mb-4 text-3xl">
        My Requests...
      </h1>
      {allRequests?.map((request) => {
        console.log(request);
        return (
          <div
            key={request?.fromUserId?._id}
            className="flex items-start justify-center"
          >
            <UserTile connection={request?.fromUserId} />
            <div className="flex gap-1 -mt-[4px]  rounded-md p-1 flex-col">
              <button
                onClick={() => reviewRequest("accepted", request._id)}
                className="p-1 font-semibold bg-green-500 text-white flex items-center justify-center rounded-md"
              >
                Accepted
              </button>
              <button
                onClick={() => reviewRequest("rejected", request._id)}
                className="p-1  bg-red-600 text-white font-semibold flex items-center justify-center rounded-md"
              >
                Rejected
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
