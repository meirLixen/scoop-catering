import { createStore, applyMiddleware, compose } from 'redux';

import AppReducers from './reducers/AppReducers';
import AppMiddleware from './MiddleWares/AppMiddleware'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(AppReducers, composeEnhancers(applyMiddleware(...AppMiddleware))

);

window.store = store;
export default store;