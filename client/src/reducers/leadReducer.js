import { GET_LEADS, LEAD_LOADING, GET_LEAD } from "../actions/types";

const initialState = {
  leads: [],
  lead: {},
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

    case GET_LEAD:
      return {
        ...state,
        lead: action.payload,
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
