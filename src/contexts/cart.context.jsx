import { createContext, useState } from 'react';

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
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

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    
    const addItemToCart = (itemToAdd) => {
        setCartItems(addCartItem(cartItems, itemToAdd));
    }

    const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart };
    return <CartContext.Provider value={ value }>{ children }</CartContext.Provider>
}