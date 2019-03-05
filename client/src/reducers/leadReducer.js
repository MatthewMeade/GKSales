import { ADD_LEAD, GET_ERRORS, GET_LEADS, LEAD_LOADING, DELETE_LEAD, GET_LEAD, CLEAR_ERRORS } from "../actions/types";

const initialState = {
  leads: [],
  // lead: {},
  loading: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_LEADS:
      return {
        ...state,
        leads: action.payload,
        loading: false,
      };

    case LEAD_LOADING:
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
}
