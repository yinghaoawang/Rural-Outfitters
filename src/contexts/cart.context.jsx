import { createContext, useReducer } from 'react';

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    totalCost: 0,
});

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

const CART_ACTION_TYPES = {
    SET_CART_ITEMS: 0, SET_IS_CART_OPEN: 1
}

const INITIAL_STATE = {
    cartItems: [],
    totalCost: 0,
    isCartOpen: false,
}

const cartReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload
            }
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload,
            }
        default:
            throw new Error(`Unhandled type ${type} in cartReducer`);
    }
};

export const CartProvider = ({ children }) => {
    const [{ cartItems, totalCost, isCartOpen }, dispatch] = useReducer(cartReducer, INITIAL_STATE);

    const updateCartItemsReducer = (newCartItems) => {
        const newTotalCost = newCartItems.reduce((acc, curr) => acc + curr.quantity * curr.price, 0);
        dispatch({
            type: CART_ACTION_TYPES.SET_CART_ITEMS, 
            payload: {
                cartItems: newCartItems,
                totalCost: newTotalCost
            }
        });
    }

    const setIsCartOpen = (value) => {
        dispatch({
            type: CART_ACTION_TYPES.SET_IS_CART_OPEN,
            payload: value
        });
    }
    
    const addItemToCart = (itemToAdd) => {
        const newCartItems = addCartItem(cartItems, itemToAdd);
        updateCartItemsReducer(newCartItems);
    }

    const removeItemFromCart = (itemToRemove) => {
        const newCartItems = removeCartItem(cartItems, itemToRemove);
        updateCartItemsReducer(newCartItems);
    }

    const clearItemFromCart = (itemToClear) => {
        const newCartItems = clearCartItem(cartItems, itemToClear);
        updateCartItemsReducer(newCartItems);
    }

    const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, removeItemFromCart, clearItemFromCart, totalCost };
    return <CartContext.Provider value={ value }>{ children }</CartContext.Provider>
}