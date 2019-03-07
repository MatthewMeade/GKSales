import axios from "axios";

import { ADD_LEAD, GET_ERRORS, GET_LEADS, LEAD_LOADING, DELETE_LEAD, GET_LEAD, CLEAR_ERRORS } from "./types";

// Get Leads
export const getLeads = () => dispatch => {
  dispatch(setLeadLoading());
  axios
    .get("/api/leads")
    .then(res => {
      dispatch({ type: GET_LEADS, payload: res.data });
    })
    .catch(err => {
      dispatch({
        type: GET_LEADS,
        payload: null,
      });
    });
};

// Get lead by ID
export const getLead = id => dispatch => {
  dispatch(setLeadLoading());
  axios
    .get(`/api/leads/${id}`)
    .then(res => {
      dispatch({ type: GET_LEAD, payload: res.data });
    })
    .catch(err => {
      dispatch({
        type: GET_LEAD,
        payload: null,
      });
    });
};

// Refresh Leads
export const refreshLeads = () => dispatch => {
  dispatch(setLeadLoading());
  axios
    .get("/api/leads/refresh")
    .then(res => {
      dispatch({ type: GET_LEADS, payload: res.data });
    })
    .catch(err => {
      dispatch({
        type: GET_LEADS,
        payload: null,
      });
    });
};

// Set loading state
export const setLeadLoading = () => {
  return { type: LEAD_LOADING };
};
