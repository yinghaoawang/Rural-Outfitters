import { createAction } from '../../utils/helper.util';
import { ProductsActionTypes as StripeActionTypes } from './stripe.reducer';

export const setClientSecret = (clientSecret) => createAction(StripeActionTypes.SET_CLIENT_SECRET, clientSecret);