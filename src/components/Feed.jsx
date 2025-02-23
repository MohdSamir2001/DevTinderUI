import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import UserCard from "./UserCard";
import { addFeed } from "../utils/feedSlice";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dipatch = useDispatch();
  console.log(feed);
  const getFeed = async () => {
    // if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dipatch(addFeed(res.data));
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    if (!feed) getFeed();
  }, []);
  if (!feed) return;
  if (feed.length <= 0)
    return (
      <h1 className="flex justify-center  mt-4">No new users found !! </h1>
    );
  return (
    feed && (
      <div className="flex justify-center mt-6">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;
