import { createStore, compose, applyMiddleware } from 'redux';
import { rootReducer } from './root-reducer';
import logger from 'redux-logger';

const middlewares = [logger];

const composedEnhancers = compose(applyMiddleware(...middlewares));

const store = createStore(rootReducer, undefined, composedEnhancers);

export default store;