import { combineReducers } from 'redux';
import { categoriesReducer } from './categories/categories.reducer';
import { productsReducer } from './products/products.reducer';
import { userReducer } from './user/user.reducer';

export const rootReducer = combineReducers({
    user: userReducer,
    products: productsReducer,
    categories: categoriesReducer,
})
