import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styles from "./SignUp.module.css";
import { useForm } from "react-hook-form";
import { createuser } from "../../actions/UserActions";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userData, setuserData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = async (event) => {
    console.log(event);
    dispatch(createuser(userData, navigate)).then(() => {
      toast.warn("Email has been already used");
    });
    reset();
  };
  useEffect(() => {
    console.log(Object.keys(errors).length !== 0);
    Object.keys(errors).length !== 0 &&
      toast.error("Please fill a valid values");
  }, [errors]);

  // const handleSignUp = async (event) => {
  //   event.preventDefault();
  //   dispatch(createuser(userData, navigate));
  // };
  const handleChange = (event) => {
    setuserData({ ...userData, [event.target.name]: event.target.value });
  };
  return (
    <div className={styles.signup_container}>
      <ToastContainer />
      <div className={styles.signup_form_container}>
        <div className={styles.left}>
          <h1>Welcome Back</h1>
          <Link to="/login">
            <button type="button" className={styles.white_btn}>
              Sign in
            </button>
          </Link>
        </div>
        <div className={styles.right}>
          <form
            className={styles.form_container}
            onSubmit={handleSubmit(onSubmit)}
          >
            <h1>Create Account</h1>
            <input
              type="text"
              placeholder="username"
              name="username"
              {...register("username", { required: "UserName is required" })}
              onChange={handleChange}
              value={userData.username}
              className={styles.input}
            />
            <span style={{ fontSize: "10px", color: "red" }}>
              {errors.username?.message}
            </span>
            <input
              type="email"
              placeholder="Email"
              name="email"
              {...register("email", { required: "Email is required" })}
              onChange={handleChange}
              value={userData.email}
              className={styles.input}
            />
            <span style={{ fontSize: "10px", color: "red" }}>
              {errors.email?.message}
            </span>
            <input
              type="password"
              placeholder="Password"
              name="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "At Least 8 Character",
                },
              })}
              onChange={handleChange}
              value={userData.password}
              className={styles.input}
            />
            <span style={{ fontSize: "10px", color: "red" }}>
              {errors.password?.message}
            </span>
            <button type="submit" className={styles.blue_btn}>
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
