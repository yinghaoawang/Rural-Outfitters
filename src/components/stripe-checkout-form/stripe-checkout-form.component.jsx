import React, { useEffect, useState } from "react";
import './stripe-checkout-form.styles.scss'
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import Button from '../button/button.component';
import { ThreeDots } from 'react-loading-icons';

export default function StripeCheckoutForm({ clientSecret, returnUrl }) {
  const stripe = useStripe();
  const elements = useElements();

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
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
    });
  }, [stripe]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);
    console.log(returnUrl);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: returnUrl,
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
        console.error(error.message);
        setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs"
  }

  const LinkAuthenticationChangeHandler = (event) => {
    if (event.target?.value) setEmail(event.target.value);
  }

  return (
    <form id="payment-form" onSubmit={ submitHandler }>
      <LinkAuthenticationElement id="link-authentication-element" onChange={ LinkAuthenticationChangeHandler } />
      <PaymentElement id="payment-element" options={ paymentElementOptions } />
      <Button buttonType='checkout' disabled={ isLoading || !stripe || !elements } id="submit">
        <span id="button-text">
          {isLoading ? <ThreeDots /> : "Pay now"}
        </span>
      </Button>
      {message && <div id="payment-message">{ message }</div>}
    </form>
  );
}