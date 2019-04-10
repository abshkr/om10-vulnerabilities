import decodeJWT from "./decodeJWT";
import * as ROUTES from "../constants/routes";

/**
 * @description
 * This is the function that checks the expiry date for the auth token.
 * It grabs the token from the session storage and converts it to JSON.
 * It also checks to see if the expiry date is valid.
 * @param history = React Router history.
 * @return {true} = if the session is valid.
 * @return {false} = if the session has expired and redirect to signout.
 */

const checkSession = history => {
  let token = sessionStorage.getItem("token");

  if (!!token) {
    try {
      token = JSON.parse(token);
      token = decodeJWT(token.access_token);
    } catch (error) {
      token = decodeJWT(token.access_token);
    }

    const currentTime = new Date();
    const tokenExpiry = new Date(token.exp * 1000);

    if (currentTime > tokenExpiry) {
      history.push(ROUTES.SIGN_OUT);
      return false;
    } else {
      return true;
    }
  }
};

export default checkSession;
