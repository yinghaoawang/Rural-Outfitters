import { createAction } from '../../utils/helper.util';
import { ProductsActionTypes } from './products.types';

export const setProducts = (products) => createAction(ProductsActionTypes.SET_PRODUCTS, products);