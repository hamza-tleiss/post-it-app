import { isPlainObject } from "@mui/utils";
import { directus } from "../server/directus";
import { AUTH_USER } from "../store/constants/AuthAction";

export const createuser = (userData, navigate, warn) => async (dispatch) => {
  try {
    const data = await directus.createUser(userData);
    console.log(data);
    dispatch({ type: AUTH_USER, value: data });
    navigate("/Home");
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const signin = (userData, navigate) => async (dispatch) => {
  // alert("inn")
  try {
    const data = await directus.getUser(userData);
    if (data === false) return true;
    console.log(data);
    dispatch({ type: AUTH_USER, value: data });
    // alert("before")
    navigate("/Home");
    // alert("after")
  } catch (error) {
    console.log(error);
    console.log(error);
    return error;
  }
};
