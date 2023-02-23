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
import { selectClientSecret } from '../../store/stripe/stripe.selector';
import { useNavigate } from 'react-router-dom';
import { emptyCart } from '../../store/cart/cart.action';

export default function StripeCheckoutForm({ returnUrl }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const clientSecret = useSelector(selectClientSecret);

  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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

  const paymentElementOptions = {
    layout: "tabs"
  }

  return (
    <form id="payment-form" onSubmit={ submitHandler }>
      <PaymentElement id="payment-element" options={ paymentElementOptions } />
      <Button buttonType='checkout' disabled={ isLoading || !stripe || !elements } id="submit">
        <span id="button-text">
          {isLoading ? <Puff /> : "Pay now"}
        </span>
      </Button>
      {message && <div id="payment-message">{ message }</div>}
    </form>
  );
}