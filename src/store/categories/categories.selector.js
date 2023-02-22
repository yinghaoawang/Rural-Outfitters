import { createSelector } from 'reselect';

const selectCategoriesReducer = state => state.categories;

export const selectCategories = createSelector(selectCategoriesReducer, categories => categories.categories);
export const selectCategoriesMap = createSelector(selectCategoriesReducer, categories => {
    return categories.categories.reduce((acc, category) => {
        return [...acc, category.title];
    }, []);
});