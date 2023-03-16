import Divider from "@mui/material/Divider";
import AllInboxIcon from "@mui/icons-material/AllInbox";
import Favorite from "@mui/icons-material/Favorite";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Avatar, Button, IconButton, Switch } from "@mui/material";
import { Box } from "@mui/system";
import { styled } from "@mui/material/styles";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { NavLink, useNavigate } from "react-router-dom";
import classes from "./Sidebar.module.css";
import { useState } from "react";

import DarkModeIcon from "@mui/icons-material/DarkMode";
import { lightBlue } from "@mui/material/colors";
import LightModeIcon from "@mui/icons-material/LightMode";
import PanToolIcon from "@mui/icons-material/PanTool";
import { useDispatch } from "react-redux";
const Sidebar = ({
  show,
  setshow,
  isMobile,
  setfreeMode,
  mode,
  toggleTheme,
  theme,
}) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOn, setisOn] = useState(false);
  const Root = styled(Box)(({ theme }) => ({
    zIndex: "30",
    [theme.breakpoints.down("md")]: {
      width: show ? "70px" : "0px",
      overflow: "auto",
      // marginTop: "-2.5rem",
    },
    [theme.breakpoints.up("md")]: {
      width: "180px",
    },
  }));
  const label = { inputProps: { "aria-label": "switch mode" } };

  return (
    <Root className={classes.flex} id="sidebar">
      {isMobile && (
        <IconButton
          className="icons"
          onClick={() => setshow(!show)}
          sx={{ display: { md: "none", lg: "none" } }}
        >
          <ChevronLeftIcon />
        </IconButton>
      )}
      {!isMobile && (
        <div className={classes.start}>
          {!isMobile && (
            <label className="text">
              {mode ? "Draggable mode" : "Not Draggable "}
            </label>
          )}
          <Switch
            {...label}
            checked={isOn}
            onClick={(e) => {
              setfreeMode(e.target.checked);
              setisOn(e.target.checked);
            }}
            title="Switch for free mode"
          />
        </div>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Avatar
          sx={{
            bgcolor: lightBlue[300],
          }}
          alt={user?.username}
          className="avatar"
        >
          {user?.username.charAt(0)}
        </Avatar>
        {!isMobile && (
          <span style={{ marginRight: "25px" }}>{user?.username}</span>
        )}
      </div>
      <NavLink
        end
        to="/Home"
        className={classes.link}
        style={({ isActive }) =>
          isActive ? { background: "rgb(165, 164, 164)" } : undefined
        }
      >
        <AllInboxIcon className="icons" />
        {!isMobile && <span className="text">All Posts</span>}
      </NavLink>
      <Divider />
      <NavLink
        to="/Home/favorite"
        className={classes.link}
        style={({ isActive }) =>
          isActive ? { background: "rgb(165, 164, 164)" } : undefined
        }
      >
        <Favorite className="icons" />{" "}
        {!isMobile && <span className="text">Favorite</span>}
      </NavLink>
      <Divider />
      <NavLink
        to="/Home/trash"
        className={classes.link}
        style={({ isActive }) =>
          isActive ? { background: "rgb(165, 164, 164)" } : undefined
        }
      >
        <DeleteOutlineIcon className="icons" />
        {!isMobile && <span className="text">Trash</span>}
      </NavLink>

      {/* <Divider /> */}
      <Divider />
      <span
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "30px",
          marginLeft: "-5px",
        }}
      >
        <label className="text">
          {" "}
          {theme === "light" ? "Light Mode" : "Dark Mode"}
          <Switch
            onChange={toggleTheme}
            checked={theme === "dark"}
            checkedIcon={<DarkModeIcon fontSize="medium" />}
          />
        </label>
      </span>
      <Divider />
      <Button
        variant="outlined"
        color="error"
        size={isMobile ? "small" : "medium"}
        sx={{ mt: "20px" }}
        onClick={() => {
          localStorage.removeItem("profile");
          navigate("/login");
        }}
      >
        Log Out
      </Button>
    </Root>
  );
};

export default Sidebar;
