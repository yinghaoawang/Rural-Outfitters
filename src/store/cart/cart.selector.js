import { createSelector } from 'reselect';

const selectCartReducer = state => state.cart;

export const selectCartItems = createSelector(selectCartReducer, cart => cart.cartItems);
export const selectIsCartOpen = createSelector(selectCartReducer, cart => cart.isCartOpen);
export const selectCartTotal = createSelector(selectCartReducer, cart => {
    const { cartItems } = cart;
    return cartItems.reduce((acc, cartItem) => {
        return acc + cartItem.price * cartItem.quantity
    }, 0);
});