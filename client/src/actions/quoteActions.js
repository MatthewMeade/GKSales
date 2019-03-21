import axios from "axios";

import {
  ADD_QUOTE,
  GET_ERRORS,
  GET_QUOTES,
  QUOTE_LOADING,
  DELETE_QUOTE,
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

export const newQuote = (history, data) => dispatch => {
  axios
    .post("/api/quotes", data)
    .then(res => {
      dispatch({ type: QUOTE_FORM_SAVE });
      history.push(`/quotes/${res.data._id}`);
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const getQuote = id => dispatch => {
  dispatch(setQuoteLoading());
  axios
    .get(`/api/quotes/${id}`)
    .then(res => {
      dispatch({ type: GET_QUOTE, payload: res.data });
    })
    .catch(err => {
      dispatch({
        type: GET_QUOTE,
        payload: null,
      });
    });
};

export const updateQuoteDetails = (id, details, history) => dispatch => {
  axios
    .post(`/api/quotes/${id}`, details)
    .then(res => {
      dispatch({ type: QUOTE_FORM_SAVE });
      dispatch({ type: CLEAR_ERRORS });
      history.push(`/quotes/${id}`);
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const addPhoto = (quoteID, file) => dispatch => {
  const fd = new FormData();
  fd.append("photo", file);
  fd.append("quote", quoteID);

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

export const quoteFormChanged = ({ prop, value }) => {
  return {
    type: QUOTE_FORM_CHANGE,
    payload: { prop, value },
  };
};

export const clearQuote = () => ({ type: CLEAR_QUOTE });

export const jobFormChanged = ({ prop, value }) => {
  return {
    type: JOB_FORM_CHANGE,
    payload: { prop, value },
  };
};

// Set loading state
export const setQuoteLoading = () => {
  return { type: QUOTE_LOADING };
};
