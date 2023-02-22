import { createAction } from '../../utils/helper.util';
import { ProductActionTypes } from './product.types';

export const setCategories = (categories) => createAction(ProductActionTypes.SET_CATEGORIES, categories);
export const setProducts = (products) => createAction(ProductActionTypes.SET_PRODUCTS, products);