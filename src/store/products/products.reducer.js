import { ProductsActionTypes } from './products.types';

const initialValues = {
    products: [],
}

export const productsReducer = (state = initialValues, action) => {
    const { type, payload } = action;
    switch (type) {
        case ProductsActionTypes.SET_PRODUCTS:
            return { ...state, products: payload }
        default:
            return state;
    }
};