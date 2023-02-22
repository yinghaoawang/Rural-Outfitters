import { CategoriesActionType } from './categories.types';

const initialValues = {
    categories: []
};

export const categoriesReducer = ((state = initialValues, action) => {
    const { type, payload } = action;
    switch (type) {
        case CategoriesActionType.SET_CATEGORIES:
            return { ...state, categories: payload }
        default:
            return state;
    }
});