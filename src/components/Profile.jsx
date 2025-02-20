import React from "react";
import EditProfile from "./EditProfile";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((store) => store.user);
  if (!user) return;
  return (
    <div className="justify-center flex mt-8">
      <EditProfile user={user} />
    </div>
  );
};

export default Profile;
