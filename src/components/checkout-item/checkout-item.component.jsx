import './checkout-item.styles.scss';

import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import { BiChevronLeft as ChevronLeft, BiChevronRight as ChevronRight } from 'react-icons/bi';

const CheckoutItem = ({ cartItem }) => {
    const { name, quantity, price, imageUrl } = cartItem;
    const { addItemToCart, removeItemFromCart, clearItemFromCart } = useContext(CartContext);
                    
    return (
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img alt={ name } className='product' src={ imageUrl } />
            </div>
            <div className='name'>{ name }</div>
            <div className='quantity'>
                <ChevronLeft className='arrow' onClick={ () => removeItemFromCart(cartItem) } />
                <div className='value'>{ quantity }</div>
                <ChevronRight className='arrow' onClick={ () => addItemToCart(cartItem) } />
            </div>
            <div className='price'>${ price }</div>
            <div className='cursor-pointer' onClick={ () => clearItemFromCart(cartItem) }>&#10005;</div>
        </div>
    );
}

export default CheckoutItem;