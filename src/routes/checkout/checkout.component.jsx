import './checkout.styles.scss';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import { useSelector } from 'react-redux';
import { selectCartItems, selectCartTotal } from '../../store/cart/cart.selector';
import Payment from '../../components/payment/payment.component';

const Checkout = () => {
    const cartItems = useSelector(selectCartItems);
    const totalCost = useSelector(selectCartTotal);
    
    return (
        <div className='checkout-container'>
            <div className='checkout-items-container'>
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
            <Payment />
        </div>
    )
}

export default Checkout;