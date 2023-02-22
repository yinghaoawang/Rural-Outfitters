import { createSelector } from 'reselect';

const selectProductReducer = state => state.products;

export const selectProducts = createSelector(selectProductReducer, products => products.products);