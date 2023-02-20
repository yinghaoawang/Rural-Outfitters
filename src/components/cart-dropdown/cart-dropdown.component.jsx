import Button from '../button/button.component';
import './cart-dropdown.styles.scss';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as EmptyCartIcon } from '../../assets/empty-cart.svg'
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import CartItem from '../cart-item/cart-item.component';

const CartDropdown = ({className, ...props }) => {
    const navigate = useNavigate();
    const { cartItems, setIsCartOpen } = useContext(CartContext);
    const checkoutHandler = () => {
        navigate('/checkout');
        setIsCartOpen(false);
    }

    return (
        <div { ...props } className={`cart-dropdown-container ${className}`}>
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
        </div>
    )
}

export default CartDropdown;