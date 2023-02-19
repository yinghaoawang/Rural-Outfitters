import { createContext, useState, useEffect } from 'react';
import { auth, createUserDocumentFromAuth, onAuthStateChangedListener } from '../utils/firebase.util';

export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
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