import { combineReducers } from "redux";
import authSlice from "./auth/auth.slice";
import postSlice from "./post/postSlice";

const rootReducers = combineReducers({
  Auth: authSlice,
  Post: postSlice,
  
});

export default rootReducers;
