import { ProductActionTypes } from './product.types';

const initialValues = {
    products: [],
    categories: [],
}

export const productReducer = (state = initialValues, action) => {
    const { type, payload } = action;
    switch (type) {
        case ProductActionTypes.SET_PRODUCTS:
            return {
                ...state,
                products: payload
            }
        case ProductActionTypes.SET_CATEGORIES:
            return {
                ...state,
                categories: payload
            }
        default:
            return state;
    }
};