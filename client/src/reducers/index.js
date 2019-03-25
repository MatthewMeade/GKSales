import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import leadReducer from "./leadReducer";
import quoteReducer from "./quoteReducer";
import quoteFormReducer from "./quoteFormReducer";
import usersReducer from "./usersReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  leads: leadReducer,
  quotes: quoteReducer,
  quoteForm: quoteFormReducer,
  users: usersReducer,
});
