import React from "react";
import { Route, Routes } from "react-router-dom";
import Profile from "../components/Profile";
import SignAndLogin from "../components/SignAndLogin";
import Body from "../components/Body";
import Feed from "../components/Feed";
import Connections from "../components/Connections";
import Requests from "../components/Requests";
import Chat from "../components/Chat";

const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Body />}>
          <Route path="/" element={<Feed />} />
          <Route path="/login" element={<SignAndLogin />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/chat/:targetUserId" element={<Chat />} />
          <Route path="/connections" element={<Connections />} />
          <Route path="/requests" element={<Requests />} />
        </Route>
      </Routes>
    </div>
  );
};

export default AppRoutes;
