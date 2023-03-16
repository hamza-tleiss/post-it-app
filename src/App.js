import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import GetStarted from "./components/GetStarted/GetStarted";
import Login from "./components/login/Login";
import SignUp from "./components/signup/SignUp";
import { useSelector } from "react-redux";
import { isPlainObject } from "@mui/utils";
import { useEffect } from "react";
import { useState } from "react";

function App() {
  const location = useLocation();
  const [isLoggedIn, setisLoggedIn] = useState(false);
  let user = null;
  useEffect(() => {
    user = JSON.parse(localStorage.getItem("profile"));
    if (user) setisLoggedIn(true);
    else setisLoggedIn(false);
    console.log(user);
    console.log(isPlainObject(user));
  }, [location]);
  return (
    <Routes>
      <Route path="/" element={<GetStarted />} />
      <Route
        path="/login"
        element={isLoggedIn ? <Navigate to={"/home"} /> : <Login />}
      />
      <Route
        path="/signUp"
        element={isLoggedIn ? <Navigate to={"/home"} /> : <SignUp />}
      />
      <Route
        path="/Home/*"
        element={
          <>
            {isLoggedIn ? (
              <div className="App">
                <Home />
              </div>
            ) : (
              <Navigate to={"/login"} />
            )}
          </>
        }
      />
    </Routes>
  );
}

export default App;
