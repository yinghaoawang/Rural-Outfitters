import Button from '../button/button.component';
import './cart-dropdown.styles.scss';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as EmptyCartIcon } from '../../assets/empty-cart.svg'
import CartItem from '../cart-item/cart-item.component';
import { setIsCartOpen } from '../../store/cart/cart.action';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';
import Dropdown from '../dropdown/dropdown.component';
import { useEffect } from 'react';

const CartDropdown = ({ className, ...props }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartItems = useSelector(selectCartItems);
    
    const checkoutHandler = () => {
        navigate('/checkout');
        dispatch(setIsCartOpen(false));
    }

    const cartDropdownOutsideClickHandler = (event) => {
        const { target } = event;
        if (target.closest('.cart-dropdown-relative')) return ;

        dispatch(setIsCartOpen(false));
        event.stopPropagation();
    }

    useEffect(() => {
        document.addEventListener('mousedown', cartDropdownOutsideClickHandler);
        return () => document.removeEventListener('mousedown', cartDropdownOutsideClickHandler);
    }, []);

    return (
        <Dropdown { ...props } className={`cart-dropdown-relative cart-dropdown-container ${ className }`}>
            { cartItems.length === 0 ?
                <div className='empty-message'>
                    <EmptyCartIcon />
                    <div>Your cart is empty!</div>
                </div>
                :
                <div className='cart-items'>
                    { cartItems.map((cartItem, index) =>
                        <CartItem key={ index } product={ cartItem }></CartItem>
                    ) }
                </div>
            }
            <Button onClick={ checkoutHandler } buttonType='inverted'>Checkout</Button>
        </Dropdown>
    )
}

export default CartDropdown;