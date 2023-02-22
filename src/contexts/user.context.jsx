import { createContext, useEffect, useReducer } from 'react';
import { auth, createUserDocumentFromAuth, onAuthStateChangedListener } from '../utils/firebase.util';
import { createAction } from '../utils/helper.util';

export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});

const USER_ACTION_TYPES = {
    SET_CURRENT_USER: 'SET_CURRENT_USER'
}

const INITIAL_VALUES = {
    currentUser: null
}

const userReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload,
            }
        default:
            throw new Error(`Unhandled type ${type} in userReducer`);
    }
}

export const UserProvider = ({ children }) => {
    const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_VALUES);
    const setCurrentUser = (newUser) => {
        dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, newUser ));
    }

    const value = { currentUser, setCurrentUser };

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            setCurrentUser(user);
            if (user) {
                createUserDocumentFromAuth(user);
            }
        });

        return unsubscribe;
    }, []);

    return (
        <UserContext.Provider value={value}>{ children }</UserContext.Provider>
    );
};