import React from "react";
import { Route, Routes } from "react-router-dom";
import Profile from "../components/Profile";
import Login from "../components/Login";
import Body from "../components/Body";
import Feed from "../components/Feed";
import Connections from "../components/Connections";
import Requests from "../components/Requests";

const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Body />}>
          <Route path="/" element={<Feed />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/connections" element={<Connections />} />
          <Route path="/requests" element={<Requests />} />
        </Route>
      </Routes>
    </div>
  );
};

export default AppRoutes;
