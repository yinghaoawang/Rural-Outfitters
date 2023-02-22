import { combineReducers } from 'redux';
import { productReducer } from './product/product.reducer';
import { userReducer } from './user/user.reducer';

export const rootReducer = combineReducers({
    user: userReducer,
    product: productReducer
})
