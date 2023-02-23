import { createStore, compose, applyMiddleware } from 'redux';
import { rootReducer } from './root-reducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const loggerMiddleware = (store) => (next) => (action) => {
    console.log('dispatching', action.type , action);
    next(action);
}

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['user'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = process.env.NODE_ENV === 'development' ? [/* loggerMiddleware */] : [];

const composeEnhancer = (process.env.NODE_ENV === 'development' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const composedEnhancers = composeEnhancer(applyMiddleware(...middlewares));

export const store = createStore(persistedReducer, undefined, composedEnhancers);
export const persistor = persistStore(store);
