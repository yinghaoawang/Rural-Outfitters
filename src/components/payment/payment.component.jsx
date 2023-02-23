import './payment.styles.scss';
import { Elements } from '@stripe/react-stripe-js'
import { useDispatch, useSelector } from 'react-redux';
import { selectCartTotal } from '../../store/cart/cart.selector';
import { useEffect } from 'react';
import { stripePromise } from '../../utils/stripe.util';
import StripeCheckoutForm from '../stripe-checkout-form/stripe-checkout-form.component';
import { selectClientSecret } from '../../store/stripe/stripe.selector';
import { setClientSecret } from '../../store/stripe/stripe.action';

const baseUrl = window.location.protocol + "//" + window.location.host + "/";

const Payment = () => {
  const dispatch = useDispatch();
  const cartTotal = useSelector(selectCartTotal);
  const clientSecret = useSelector(selectClientSecret);

  useEffect(() => {
    if (cartTotal <= 0) return;
    const createPaymentIntent = async () => {
      const data = await fetch('/.netlify/functions/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: cartTotal * 100 }),
      }).then(res => res.json());

      dispatch(setClientSecret(data.clientSecret));
    }
    
    createPaymentIntent().catch(console.error);
  }, [cartTotal]);

  const options = {
    clientSecret,
  };

  return (
    <div className='payment-container'>
      <div className='payment-header'>Payment</div>
      <div className='checkout-element-container'>
        { clientSecret && (
            <Elements stripe={ stripePromise } options={ options }>
                <StripeCheckoutForm clientSecret={ clientSecret } returnUrl={ `${baseUrl}checkout/success` } />
            </Elements>
        )}
    </div>
    </div>
  );
}

export default Payment;