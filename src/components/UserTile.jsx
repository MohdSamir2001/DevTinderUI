import React from "react";

const UserTile = ({ connection }) => {
  const { photoUrl, firstName, lastName, about } = connection;

  return (
    <div className="flex rounded-md p-2 bg-slate-700 w-full items-center">
      <img className="w-16 h-16 rounded-full" src={photoUrl} alt="User" />
      <div className="ml-3">
        <h1 className="text-xl font-semibold text-white">
          {firstName + " " + lastName}
        </h1>
        <p className="text-gray-300 line-clamp-1 text-sm">{about}</p>
      </div>
    </div>
  );
};

export default UserTile;
