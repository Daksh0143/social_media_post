import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../Component/Home";

import React from "react";
import Navbar from "../Component/Navbar";
import CreatePost from "../Component/CreatePost";

const Navigator = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-post" element={<CreatePost />} />
      </Routes>
    </Router>
  );
};

export default Navigator;
