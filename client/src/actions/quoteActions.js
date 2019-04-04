import axios from "axios";

import {
  GET_ERRORS,
  GET_QUOTES,
  QUOTE_LOADING,
  GET_QUOTE,
  CLEAR_ERRORS,
  CLEAR_QUOTE,
  QUOTE_FORM_CHANGE,
  QUOTE_FORM_SAVE,
  JOB_FORM_CHANGE,
} from "./types";

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

// Get quotes by lead ID
export const getQuotesByLead = id => dispatch => {
  dispatch(setQuoteLoading());

  axios
    .get(`/api/quotes/lead/${id}`)
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

// Create a new quote
export const newQuote = (history, data, redirectLocation) => dispatch => {
  axios
    .post("/api/quotes", data)
    .then(res => {
      dispatch({ type: QUOTE_FORM_SAVE });
      history.push(`/quotes/${res.data._id}/${redirectLocation}`);
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Get a quote by id
export const getQuote = (id, history) => dispatch => {
  dispatch(setQuoteLoading());
  axios
    .get(`/api/quotes/${id}`)
    .then(res => {
      dispatch({ type: GET_QUOTE, payload: res.data });
    })
    .catch(err => {
      history.push("/not-found");
      dispatch({
        type: GET_QUOTE,
        payload: null,
      });
    });
};

// Update a quote
export const updateQuoteDetails = (id, details, history, redirectLocation) => dispatch => {
  axios
    .post(`/api/quotes/${id}`, details)
    .then(res => {
      dispatch({ type: QUOTE_FORM_SAVE });
      dispatch({ type: CLEAR_ERRORS });
      history.push(`/quotes/${id}/${redirectLocation}`);
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Add photo to a quote
export const addPhoto = (quoteID, file) => dispatch => {
  const fd = new FormData();
  fd.append("quote", quoteID);
  fd.append("photo", file);

  axios
    .post(`/api/quotes/${quoteID}/addPhoto`, fd, {
      headers: {
        "content-type": "multipart/form-data",
      },
    })
    .then(res => {
      dispatch({ type: GET_QUOTE, payload: res.data });
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Delete photo from a quote
export const deletePhoto = (quoteID, fileName) => dispatch => {
  axios
    .post(`/api/quotes/${quoteID}/deletePhoto`, { fileName })
    .then(res => dispatch({ type: GET_QUOTE, payload: res.data }))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Quote form changed (New and Edit)
export const quoteFormChanged = ({ prop, value }) => {
  return {
    type: QUOTE_FORM_CHANGE,
    payload: { prop, value },
  };
};

// Clear quote form
export const clearQuote = () => ({ type: CLEAR_QUOTE });

// Set loading state
export const setQuoteLoading = () => {
  return { type: QUOTE_LOADING };
};
