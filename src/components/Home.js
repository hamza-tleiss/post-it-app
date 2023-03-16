import React, { createContext, useEffect, useState } from "react";
import Navbar from "./Navbar";
import Card from "./Card/Card";
import { useMediaQuery } from "@mui/material";
import Sidebar from "./Sidebar/Sidebar";
import AddCard from "./AddCard";
import { Route, Routes, useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getposts } from "../actions/PostActions";
import isOnline from "is-online";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
const isConnected = async () => await isOnline();

export const ThemeContext = createContext(null);
function Home() {
  const [show, setshow] = useState(true);
  const [freeMode, setfreeMode] = useState(false);
  const isMobile = useMediaQuery("(max-width:900px)");
  console.log(isMobile);
  const [showAddCard, setShowAddCard] = useState(false);
  const [currentId, setcurrentId] = useState("");
  const [searchPosts, setsearchPosts] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem("theme"));
  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };
  const state = useSelector((state) => state);

  //   useEffect(() => {
  //     localStorage.setItem('state',JSON.stringify(state))
  //  },[state])

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);
  // useEffect(() => {
  //   setInterval(() => {
  //     isConnected().then((res) => {console.log(res);
  //     if (res===true) {
        
  //       toast.warn("You are Disconnected")
  //     }
  //   })}, 5000);
  // }, []);

  const user = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const isSort = queryParams.get("sort");
  const inHome = location.pathname.split("/")[2]?.toLocaleLowerCase();
  useEffect(() => {
    dispatch(getposts(user?.id));
  }, [dispatch, user?.id]);
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div
        style={{ backgroundColor: theme === "dark" ? "#11100f" : "" }}
        className="Wrap"
        id={theme}
      >
        <ToastContainer limit={1} />
        <Navbar
          isMobile={isMobile}
          show={show}
          setshow={setshow}
          setsearchPosts={setsearchPosts}
          toggleTheme={toggleTheme}
          theme={theme}
        />
        <div
          style={{
            position: "relative",
            top: "70px",
            left: isMobile ? (show ? "4rem" : "0.3rem") : "250px",
            display: "flex",
          }}
        >
          {/* <h1>Post it</h1> <button className="sort">Ascending</button> */}
          <h1 style={{ fontSize: "20px" }}>
            {inHome === "favorite"
              ? "Favorite Posts"
              : inHome === "trash"
              ? "Trash Cleaner"
              : "Post it"}
          </h1>
          <button
            className="sort"
            onClick={() =>
              navigate(
                `/Home${
                  inHome === "favorite"
                    ? "/Favorite"
                    : inHome === "trash"
                    ? "/Trash"
                    : ""
                }${isSort === "desc" ? "" : "?sort=desc"}`
              )
            }
          >
            {isSort === "desc" ? "Ascending" : "Descending"}
          </button>
        </div>

        <Sidebar
          show={show}
          setshow={setshow}
          isMobile={isMobile}
          setfreeMode={setfreeMode}
          mode={freeMode}
          theme={theme}
          toggleTheme={toggleTheme}
        />
        <Routes>
          <Route
            path="/"
            element={
              <div className="Main">
                <Card
                  isMobile={isMobile}
                  show={show}
                  free={freeMode}
                  setShowAddCard={setShowAddCard}
                  currentId={currentId}
                  setcurrentId={setcurrentId}
                  searchPosts={searchPosts}
                  setsearchPosts={setsearchPosts}
                  reducer="Home"
                  isSort={isSort}
                />
              </div>
            }
          />
          <Route
            path="/favorite"
            element={
              <div className="Main">
                <Card
                  isMobile={isMobile}
                  show={show}
                  free={freeMode}
                  setShowAddCard={setShowAddCard}
                  currentId={currentId}
                  setcurrentId={setcurrentId}
                  searchPosts={searchPosts}
                  setsearchPosts={setsearchPosts}
                  reducer="Favorite"
                  isSort={isSort}
                />
              </div>
            }
          />
          <Route
            path="/trash"
            element={
              <div className="Main">
                <Card
                  isMobile={isMobile}
                  show={show}
                  free={freeMode}
                  setShowAddCard={setShowAddCard}
                  currentId={currentId}
                  setcurrentId={setcurrentId}
                  searchPosts={searchPosts}
                  setsearchPosts={setsearchPosts}
                  reducer="Trash"
                  isSort={isSort}
                />
              </div>
            }
          />
        </Routes>
        <AddCard
          showAddCard={showAddCard}
          setShowAddCard={setShowAddCard}
          currentId={currentId}
          setcurrentId={setcurrentId}
          isMobile={isMobile}
        />
        {!inHome && (
          <div className="add" onClick={() => setShowAddCard(true)}>
            <span>+</span>
          </div>
        )}
      </div>
    </ThemeContext.Provider>
  );
}

export default Home;
