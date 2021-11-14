import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import RootReducer from "../reducers";

const enhancer = compose(
  applyMiddleware(thunkMiddleware),
  window.devToolsExtension ? window.devToolsExtension() : f => f
);

const store = createStore(RootReducer, enhancer);

export default store;