import { QUOTE_FORM_CHANGE, QUOTE_FORM_SAVE, CLEAR_QUOTE } from "../actions/types";

const INITIAL_STATE = {
  consultationDate: new Date().toISOString(),
  address: "",
  notes: "",
  lead: "",
  salesperson: "",
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case QUOTE_FORM_CHANGE:
      return { ...state, [action.payload.prop]: action.payload.value };

    case QUOTE_FORM_SAVE:
      return { ...INITIAL_STATE };

    case CLEAR_QUOTE:
      return { ...INITIAL_STATE };

    default:
      return state;
  }
};
