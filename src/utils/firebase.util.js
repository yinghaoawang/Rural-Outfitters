import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './config';
import {
    getAuth, onAuthStateChanged, signOut,
    signInWithRedirect, signInWithPopup, signInWithEmailAndPassword,
    GoogleAuthProvider, createUserWithEmailAndPassword,  } from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseApp = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);
export const signInAuthUserWithEmailAndPassword = (email, password) => signInWithEmailAndPassword(auth, email, password);

export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName, email, createdAt, ...additionalInformation
            });
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) {
        console.error('Email or password empty.');
        return;
    }

    return await createUserWithEmailAndPassword(auth, email, password);
}

export const signOutAuthUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);
