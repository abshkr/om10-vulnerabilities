import axios from "axios";
import { AUTH_USER, AUTH_ERROR } from "./types";
import * as HASH from "../utils/hash";
import * as API from "../constants/api";
import { notification } from "antd";

export const signin = (formProps, callback) => async dispatch => {
  try {
    const payload = HASH.login("EN", formProps.email, formProps.password);

    const response = await axios({
      method: "get",
      url: `https://${API.URL}/api/login.php?user=${payload.user}&password=${payload.psw}`,
      config: { headers: { "Content-Type": "multipart/form-data" } }
    });

    if (response.data.msg_desc === "SUCCESS") {
      dispatch({ type: AUTH_USER, payload: response.data });
      sessionStorage.setItem("token", JSON.stringify(response.data));

      notification.success({
        message: "Successfully Logged In",
        description: `Welcome to OMEGA 5000`
      });

      callback();
    } else {
      dispatch({ type: AUTH_ERROR, payload: "Invalid login credentials" });

      notification.error({
        message: "Invalid login credentials",
        description: "Please Try Again"
      });
    }
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: "Invalid login credentials" });
    notification.error({
      message: "Something has gone wrong.",
      description: e
    });
  }
};

export const signout = idle => {
  sessionStorage.removeItem("token");

  if (!!idle) {
    notification.warning({
      message: "Automically Logged out",
      description: `We have detected Inactivity and Safely logged you out.`,
      duration: 0
    });
  } else {
    notification.success({
      message: "Successfully Logged Out.",
      description: `Please Login Again to Continue`
    });
  }

  return {
    type: AUTH_USER,
    payload: ""
  };
};
