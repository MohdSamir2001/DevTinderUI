import React from "react";
const UserTile = ({ connection }) => {
  const { photoUrl, firstName, lastName, about } = connection;
  return (
    <div>
      <div className="flex mb-2 justify-center">
        <div className="flex rounded-md p-2 w-96 gap-2 bg-slate-700">
          <img className="w-12 rounded-full" src={photoUrl} alt="" />
          <div>
            <h1 className="text-xl font-semibold text-white">
              {firstName + " " + lastName}
            </h1>
            <h1 className="line-clamp-1">{about}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTile;
