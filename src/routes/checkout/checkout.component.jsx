import { useContext } from 'react';
import './checkout.styles.scss';
import { CartContext } from '../../contexts/cart.context';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';

const Checkout = () => {
    const { cartItems, totalCost } = useContext(CartContext);
    return (
        <div className='checkout-container'>
            <div className='checkout-header'>
                <div className='header-block'>Product</div>
                <div className='header-block'>Name</div>
                <div className='header-block'>Quantity</div>
                <div className='header-block'>Price</div>
                <div className='header-block'>Remove</div> 

            </div>
            { cartItems.map(cartItem => <CheckoutItem key={ cartItem.id } cartItem={ cartItem } />)}
            <div className='total'>Total ${ totalCost }</div>

        </div>
    )
}

export default Checkout;