const initialValues = {
    categories: []
};

export const CategoriesActionType = {
    SET_CATEGORIES: 'SET_CATEGORIES'
}

export const categoriesReducer = ((state = initialValues, action) => {
    const { type, payload } = action;
    switch (type) {
        case CategoriesActionType.SET_CATEGORIES:
            return { ...state, categories: payload }
        default:
            return state;
    }
});