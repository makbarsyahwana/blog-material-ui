import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import PostReducer from "./PostReducer";
import CommentReducer from "./CommentRecuder";

const appReducer = combineReducers({
  Auth: AuthReducer,
  Post: PostReducer,
  Comment: CommentReducer,
});

const RootReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    state = undefined;
  }
  return appReducer(state, action);
};

export default RootReducer;
