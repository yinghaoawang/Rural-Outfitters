import { createAction } from '../../utils/helper.util';
import { CartActionTypes } from './cart.reducer';

const addCartItem = (cartItems, itemToAdd) => {
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === itemToAdd.id);
    if (existingCartItem) {
        return cartItems.map((cartItem) => {
            if (cartItem.id === itemToAdd.id) {
                return { ...cartItem, quantity: cartItem.quantity + 1 }
            } else {
                return cartItem;
            }
        });
    }

    return [ { ...itemToAdd, quantity: 1 }, ...cartItems ];
}

const removeCartItem = (cartItems, itemToRemove) => {
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === itemToRemove.id);
    if (!existingCartItem) {
        console.error('Item to remove from cart does not exist');
        return cartItems;
    }

    if (existingCartItem.quantity === 1) {
        return cartItems.filter((cartItem) => (
            cartItem !== existingCartItem
        ));
    }

    return cartItems.map((cartItem) => {
        if (cartItem === existingCartItem) {
            return { ...existingCartItem, quantity: cartItem.quantity - 1 };
        }
        return cartItem;
    })
}

const clearCartItem = (cartItems, itemToClear) => {
    return cartItems.filter((cartItem) => itemToClear.id !== cartItem.id);
}

export const setIsCartOpen = (value => createAction(CartActionTypes.SET_IS_CART_OPEN, value));
export const addItemToCart = ((cartItems, itemToAdd) => createAction(CartActionTypes.SET_CART_ITEMS, addCartItem(cartItems, itemToAdd)));
export const removeItemFromCart = ((cartItems, itemToRemove) => createAction(CartActionTypes.SET_CART_ITEMS, removeCartItem(cartItems, itemToRemove)));
export const clearItemFromCart = ((cartItems, itemToClear) => createAction(CartActionTypes.SET_CART_ITEMS, clearCartItem(cartItems, itemToClear)));