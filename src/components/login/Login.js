import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { signin } from "../../actions/UserActions";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userData, setuserData] = useState({ email: "", password: "" });
  const [error, seterror] = useState(false);

  // const {register, handleSubmit, formState:{errors}, reset}= useForm();
  // const onSubmit = async (event) => {
  //   console.log(event);
  //   event.preventDefault();
  //   dispatch(signin(userData, navigate));
  //   reset()
  // }
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = (event) => {
    console.log(event);
    dispatch(signin(userData, navigate)).then((res) =>
      toast.error("User not found")
    );
    reset();
  };
  // const handleSignIn = async (event) => {
  //   event.preventDefault();
  //   dispatch(signin(userData, navigate));
  // };

  const handleChange = (event) => {
    setuserData({ ...userData, [event.target.name]: event.target.value });
  };

  return (
    <div className={styles.login_container}>
      <ToastContainer />
      <div className={styles.login_form_container}>
        <div className={styles.left}>
          <form
            className={styles.form_container}
            onSubmit={handleSubmit(onSubmit)}
          >
            <h1 className={styles.header}>Login to Your Account</h1>
            <input
              type="email"
              placeholder="Email"
              name="email"
              {...register("email", { required: "Email is required" })}
              onChange={handleChange}
              value={userData.email}
              className={styles.input}
            />
            <span style={{ fontSize: "10px", color: "red", float: "left" }}>
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
            <button
              type="submit"
              className={styles.blue_btn}
              // onClick={handleSignIn}
            >
              Sign In
            </button>
            {error && <span style={{ color: "red" }}>user not found!</span>}
          </form>
        </div>
        <div className={styles.right}>
          <h1>New Here ?</h1>
          <Link to="/signup">
            <button type="button" className={styles.white_btn}>
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
