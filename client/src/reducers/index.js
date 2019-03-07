import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import leadReducer from "./leadReducer";
import quoteReducer from "./quoteReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  leads: leadReducer,
  quotes: quoteReducer,
});
