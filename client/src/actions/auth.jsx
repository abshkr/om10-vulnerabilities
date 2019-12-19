import axios from "axios";
import { AUTHORIZED, UNAUTHORIZED } from "./types";

export const login = (formProps, callback) => async dispatch => {
  try {
    axios
      .post(`http://localhost:3000/api/user/login`, {
        email: formProps.email,
        password: formProps.password
      })
      .then(response => {
        if (response.status === 200) {
          dispatch({ type: AUTHORIZED, payload: response.data.token });
          sessionStorage.setItem("token", response.data.token);

          callback();
        } else {
          dispatch({
            type: UNAUTHORIZED,
            payload: "Invalid login credentials"
          });
        }
      });
  } catch (e) {
    dispatch({ type: UNAUTHORIZED, payload: "Invalid login credentials" });
  }
};

export const signout = () => {
  sessionStorage.removeItem("token");

  return {
    type: AUTHORIZED,
    payload: ""
  };
};
