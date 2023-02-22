const initialValues = {
    currentUser: null
}

export const UserActionTypes = {
    SET_CURRENT_USER: 'SET_CURRENT_USER'
}

export const userReducer = (state = initialValues, action) => {
    const { type, payload } = action;
    switch (type) {
        case UserActionTypes.SET_CURRENT_USER:
            return { ...state, currentUser: payload }
        default:
            return state;
    }
}