import { BrowserRouter as Router, Routes, Route, json } from "react-router-dom";
import Login from "../Component/Login";
import Register from "../Component/Resgister";

import React from "react";
import Navbar from "../Component/Navbar";

const AuthNavigator = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default AuthNavigator;
