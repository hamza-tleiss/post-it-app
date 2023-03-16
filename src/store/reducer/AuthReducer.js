import { AUTH_USER } from "../constants/AuthAction";

export const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case AUTH_USER:
      localStorage.setItem("profile", JSON.stringify({ ...action?.value }));
      return { ...state, authData: action?.value };

    default:
      return { ...state };
  }
};
