import axios from "axios";

import { GET_LEADS, LEAD_LOADING, GET_LEAD } from "./types";

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
export const getLead = (id, history) => dispatch => {
  dispatch(setLeadLoading());
  axios
    .get(`/api/leads/${id}`)
    .then(res => {
      dispatch({ type: GET_LEAD, payload: res.data });
    })
    .catch(err => {
      history.push("/not-found");
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
