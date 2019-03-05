import {
  ADD_QUOTE,
  GET_ERRORS,
  GET_QUOTES,
  QUOTE_LOADING,
  DELETE_QUOTE,
  GET_QUOTE,
  CLEAR_ERRORS,
} from "../actions/types";

const initialState = {
  quotes: [],
  quote: {},
  loading: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_QUOTES:
      return {
        ...state,
        leads: action.payload,
        loading: false,
      };

    case QUOTE_LOADING:
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
}
