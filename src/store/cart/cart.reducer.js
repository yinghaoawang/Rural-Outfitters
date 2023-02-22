const initialValues = {
    isCartOpen: false,
    cartItems: [],
};

export const CartActionTypes = {
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
    SET_CART_ITEMS: 'SET_CART_ITEMS',
};

export const cartReducer = (state = initialValues, action) => {
    const { type, payload } = action;
    switch (type) {
        case CartActionTypes.SET_IS_CART_OPEN:
            return { ...state, isCartOpen: payload }
        case CartActionTypes.SET_CART_ITEMS:
            return { ...state, cartItems: payload }
        default:
            return state;
    }
}