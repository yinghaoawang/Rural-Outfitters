import { createSelector } from 'reselect';

const selectStripeReducer = state => state.stripe;

export const selectClientSecret = createSelector(selectStripeReducer, stripe => stripe.clientSecret);