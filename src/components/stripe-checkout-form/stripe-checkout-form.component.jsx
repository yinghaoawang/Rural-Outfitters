import React, { useEffect, useState } from "react";
import './stripe-checkout-form.styles.scss'
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import Button from '../button/button.component';
import { Puff } from 'react-loading-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { emptyCart } from '../../store/cart/cart.action';
import { createOrderDocument } from '../../utils/firebase.util';
import { selectCartItems } from '../../store/cart/cart.selector';
import { selectCurrentUser } from '../../store/user/user.selector';

export default function StripeCheckoutForm({ returnUrl }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const currentUser = useSelector(selectCurrentUser);

  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormReady, setIsFormReady] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const res = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: returnUrl,
      },
      redirect: 'if_required'
    });

    setIsLoading(false);

    const { paymentIntent, error } = res;

    if (error) {
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message);
      } else {
          console.error(error.message);
          setMessage("An unexpected error occurred.");
      }
      return;
    }

    if (paymentIntent) {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");

          if (currentUser) {
            createOrderDocument(
              { id: paymentIntent.id, userId: currentUser.uid || null,
                amount: paymentIntent.amount, paymentIntent, items: cartItems 
              }
            );
          }
          
          dispatch(emptyCart());
          navigate('/checkout/success');
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          console.error(paymentIntent.error);
          setMessage("Something went wrong.");
          break;
      }
    } else {
      setMessage("Something went wrong.");
    }
  };

  const paymentElementReadyHandler = (event) => {
    setIsFormReady(true);
  }

  const paymentElementOptions = {
    layout: {
      type: 'accordion',
    }
  }

  return (
    <form id="payment-form" onSubmit={ submitHandler }>
      <PaymentElement onReady={ paymentElementReadyHandler } id="payment-element" options={ paymentElementOptions } />
      <div className={`delayed-container ${ isFormReady ? 'ready' : 'unready' }`}>
        <Button buttonType='checkout' disabled={ isLoading || !stripe || !elements } id="submit">
          <span id="button-text">
            {isLoading ? <Puff /> : "Pay now"}
          </span>
        </Button>
        <div className='free-card-info'>
          <details>
            <summary>Free test card here</summary>
            <div className='text'>
              <div>Card: 4242 4242 4242 4242</div>
              <div className='flex gap-x-12'>
                <div>
                  Exp: 4/24
                </div>
                <div>
                  CVC: 424
                </div>
              </div>
              
              <div>United States</div>
              <div>42424</div>
            </div>
          </details>
        </div>
      </div>
      
      
      { message && <div id="payment-message">{ message }</div> }
    </form>
  );
}