import auth_reducer from "./auth";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  auth: auth_reducer,
});

export default rootReducer;
