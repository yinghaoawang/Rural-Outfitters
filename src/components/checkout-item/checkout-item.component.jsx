import './checkout-item.styles.scss';

import { BiChevronLeft as ChevronLeft, BiChevronRight as ChevronRight } from 'react-icons/bi';
import { addItemToCart, removeItemFromCart, clearItemFromCart } from '../../store/cart/cart.action';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';

const CheckoutItem = ({ cartItem }) => {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const { name, quantity, price, imageUrl } = cartItem;
                    
    return (
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img alt={ name } className='product' src={ imageUrl } />
            </div>
            <div className='name'>{ name }</div>
            <div className='quantity'>
                <ChevronLeft className='arrow' onClick={ () => dispatch(removeItemFromCart(cartItems, cartItem)) } />
                <div className='value'>{ quantity }</div>
                <ChevronRight className='arrow' onClick={ () => dispatch(addItemToCart(cartItems, cartItem)) } />
            </div>
            <div className='price'>${ price }</div>
            <div className='remove' onClick={ () => dispatch(clearItemFromCart(cartItems, cartItem)) }>&#10005;</div>
        </div>
    );
}

export default CheckoutItem;