import React, { useEffect, useState } from "react";
import './stripe-checkout-form.styles.scss'
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import Button from '../button/button.component';
import { Puff } from 'react-loading-icons';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { emptyCart } from '../../store/cart/cart.action';

export default function StripeCheckoutForm({ returnUrl }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      type: 'tabs',
    }
  }

  return (
    <form id="payment-form" onSubmit={ submitHandler }>
      <PaymentElement onReady={ paymentElementReadyHandler } id="payment-element" options={ paymentElementOptions } />
      <Button className={ isFormReady ? 'ready' : 'unready' } buttonType='checkout' disabled={ isLoading || !stripe || !elements } id="submit">
        <span id="button-text">
          {isLoading ? <Puff /> : "Pay now"}
        </span>
      </Button>
      
      { message && <div id="payment-message">{ message }</div> }
    </form>
  );
}