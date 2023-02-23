const initialValues = {
    clientSecret: null,
}

export const ProductsActionTypes = {
    SET_CLIENT_SECRET: 'SET_CLIENT_SECRET',
};

export const stripeReducer = (state = initialValues, action) => {
    const { type, payload } = action;
    switch (type) {
        case ProductsActionTypes.SET_CLIENT_SECRET:
            return { ...state, clientSecret: payload }
        default:
            return state;
    }
};