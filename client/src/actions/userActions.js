import axios from "axios";

import { GET_ERRORS, GET_USERS, USERS_LOADING } from "./types";

// Fetches a list of salespeople
export const getUsers = () => dispatch => {
  dispatch({ type: USERS_LOADING });
  axios
    .get("/api/users")
    .then(({ data }) => dispatch({ type: GET_USERS, payload: data }))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};
