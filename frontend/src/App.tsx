import { useEffect, useState } from "react";
import "./App.css";
import Register from "./Component/Resgister";
import { BrowserRouter as Router, Routes, Route, json } from "react-router-dom";
import Login from "./Component/Login";
import Navbar from "./Component/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import mockData from "./Constant/MOCK_DATA.json";
import Home from "./Component/Home";
import CreatePost from "./Component/CreatePost";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Navigator from "./Constant/Navigator";
import AuthNavigator from "./Constant/AuthNavigator";
import { useSelector } from "react-redux";
import { authSelector } from "./redux/auth/auth.slice";

function App() {
  const { currentUser } = useSelector(authSelector);
  const [islogin, setIsLogin] = useState(Boolean(currentUser));
  console.log("currentUSer", Boolean(currentUser), currentUser);

  useEffect(() => {
    setIsLogin(currentUser && currentUser ? true : false);
  }, [currentUser]);

  return (
    <>
      {islogin ? <Navigator /> : <AuthNavigator />}
      <ToastContainer />
    </>
  );
}

export default App;
