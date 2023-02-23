import './payment.styles.scss';
import { Elements } from '@stripe/react-stripe-js'
import { useSelector } from 'react-redux';
import { selectCartTotal } from '../../store/cart/cart.selector';
import { useEffect, useState } from 'react';
import { stripePromise } from '../../utils/stripe.util';
import StripeCheckoutForm from '../stripe-checkout-form/stripe-checkout-form.component';

const PaymentForm = () => {
  const cartTotal = useSelector(selectCartTotal);
  const [clientSecret, setClientSecret] = useState(null);

  useEffect(() => {
      fetch("/.netlify/functions/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: cartTotal * 100  }),
      })
        .then((res) => res.json())
        .then((data) => {
          const { clientSecret } = data;

          setClientSecret(clientSecret);
        }
      );
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
                <StripeCheckoutForm clientSecret={ clientSecret } returnUrl={ window.location.href } />
            </Elements>
        )}
    </div>
    </div>
  );
}

export default PaymentForm;