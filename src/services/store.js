import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

export const createReduxStore = (reducers) =>
  createStore(reducers, compose(applyMiddleware(thunk)));
