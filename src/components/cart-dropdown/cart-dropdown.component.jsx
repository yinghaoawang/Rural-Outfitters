import Button from '../button/button.component';
import './cart-dropdown.styles.scss';
import { ReactComponent as EmptyCartIcon } from '../../assets/empty-cart.svg'
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import CartItem from '../cart-item/cart-item.component';

const CartDropdown = () => {
    const { cartItems } = useContext(CartContext);
    return (
        <div className='cart-dropdown-container'>
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
            <Button buttonType='inverted'>Checkout</Button>
        </div>
    )
}

export default CartDropdown;