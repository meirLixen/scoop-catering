import { applyMiddleware, compose, createStore } from "redux";

import AppMiddleware from "./MiddleWares/AppMiddleware";
import AppReducers from "./reducers/AppReducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  AppReducers,
  composeEnhancers(applyMiddleware(...AppMiddleware))
);

window.store = store;
export default store;
