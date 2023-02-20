import { createContext, useEffect, useState } from 'react';

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

    return [ ...cartItems, { ...itemToAdd, quantity: 1 } ];
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

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalCost, setTotalCost] = useState(0);
    
    const addItemToCart = (itemToAdd) => {
        setCartItems(addCartItem(cartItems, itemToAdd));
    }

    const removeItemFromCart = (itemToRemove) => {
        setCartItems(removeCartItem(cartItems, itemToRemove));
    }

    const clearItemFromCart = (itemToClear) => {
        setCartItems(clearCartItem(cartItems, itemToClear));
    }

    useEffect(() => {
        setTotalCost(cartItems.reduce((acc, curr) => acc + curr.quantity * curr.price, 0));
    }, [cartItems]);

    const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, removeItemFromCart, clearItemFromCart, totalCost };
    return <CartContext.Provider value={ value }>{ children }</CartContext.Provider>
}