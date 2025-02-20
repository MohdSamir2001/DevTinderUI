import React from "react";

const UserCard = ({ user }) => {
  const { about, firstName, lastName, photoUrl, skills } = user;
  return (
    <div className="bg-base-200 w-72 rounded-md overflow-hidden font-semibold">
      <img className=" w-full" src={photoUrl} alt="" />
      <div className="">
        <h1 className="text-center my-2 text-2xl">
          {firstName + " " + lastName}
        </h1>
        <h1 className="bg-base-200 border-b-[1px] text-center p-2">
          -- Skills --
        </h1>
        <h1 className="p-2">{skills.join(" , ")}</h1>
        <h1 className="bg-base-200 border-b-[1px] text-center p-2">
          -- About --
        </h1>
        <h1 className="p-2">{about}</h1>
      </div>
      <div className="flex">
        <button className="p-2 w-full bg-red-600 text-white">Ignored</button>
        <button className="p-2 w-full bg-green-600 text-white">
          Interested
        </button>
      </div>
    </div>
  );
};

export default UserCard;
