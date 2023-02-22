import { UserActionTypes } from './user.types';

const initialValues = {
    currentUser: null
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