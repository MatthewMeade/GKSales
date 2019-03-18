import {
  ADD_QUOTE,
  GET_ERRORS,
  GET_QUOTES,
  QUOTE_LOADING,
  DELETE_QUOTE,
  GET_QUOTE,
  CLEAR_ERRORS,
  QUOTE_FORM_CHANGE,
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
        quotes: action.payload,
        loading: false,
      };
    case GET_QUOTE:
      return {
        ...state,
        quote: action.payload,
        loading: false,
      };

    case QUOTE_LOADING:
      return {
        ...state,
        loading: true,
      };

    case QUOTE_FORM_CHANGE:
      return { ...state, [action.payload.prop]: action.payload.value };

    default:
      return state;
  }
}
