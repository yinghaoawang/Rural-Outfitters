require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const webhooksSecret = process.env.STRIPE_WEBHOOKS_SECRET;

exports.handler = async ({ body, headers }) => {
    const signature = headers['stripe-signature'];

    let event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhooksSecret);
    } catch (err) {
      return {
        status: 400,
        send: `Webhook Error: ${err.message}`
      }
    }

    const { type, data } = event;
  
    switch (type) {
      case 'payment_intent.succeeded':
        console.log('Payment succeeded');
        break;
      default:
        // console.log(`Unhandled event type ${type}`);
    }
  
    return {
        statusCode: 200,
        body: JSON.stringify({ data })
    }
}