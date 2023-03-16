import React from "react";
import "./GetStarted.css";
import Arrange from "../../assets/Arranging Files.png";
import LeftEllipse from "../../assets/Ellipse 3.png";
import RightEllipse from "../../assets/Ellipse 4.png";
import { Link } from "react-router-dom";
function GetStarted() {
  return (
    <div className="getStarted" style={{ height: "100%" }}>
      <img className="leftEllipse" src={LeftEllipse} alt="blabla" />
      <img className="rightEllipse" src={RightEllipse} alt="blabla" />
      <h1 className="title">Post-It App</h1>
      <h4 className="title">Let's do this</h4>
      <img className="arrangeImg" src={Arrange} alt="blabla" />
      <h2 className="title">Gets things done with Post-It</h2>
      <div className="link">
        <Link className="btnn" to="/login">
          Get Started
        </Link>
      </div>
    </div>
  );
}

export default GetStarted;
