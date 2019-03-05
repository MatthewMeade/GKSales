import axios from "axios";

import { ADD_QUOTE, GET_ERRORS, GET_QUOTES, QUOTE_LOADING, DELETE_QUOTE, GET_QUOTE, CLEAR_ERRORS } from "./types";

// Get quotes
export const getQuotes = () => dispatch => {
  dispatch(setQuoteLoading());

  axios
    .get("/api/quotes")
    .then(res => {
      dispatch({ type: GET_QUOTES, payload: res.data });
    })
    .catch(err => {
      dispatch({
        type: GET_QUOTES,
        payload: null,
      });
    });
};

// Set loading state
export const setQuoteLoading = () => {
  return { type: QUOTE_LOADING };
};
