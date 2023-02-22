const initialValues = {
    products: [],
}

export const ProductsActionTypes = {
    SET_PRODUCTS: 'SET_PRODUCTS',
};

export const productsReducer = (state = initialValues, action) => {
    const { type, payload } = action;
    switch (type) {
        case ProductsActionTypes.SET_PRODUCTS:
            return { ...state, products: payload }
        default:
            return state;
    }
};