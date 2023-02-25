import { initializeApp } from 'firebase/app';
import {
    getAuth, onAuthStateChanged, signOut,
    signInWithRedirect, signInWithPopup, signInWithEmailAndPassword,
    GoogleAuthProvider, createUserWithEmailAndPassword,  } from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FB_API_KEY,
    authDomain: process.env.REACT_APP_FB_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FB_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FB_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FB_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FB_APP_ID,
    measurementId: process.env.REACT_APP_FB_MEASUREMENT_ID,
};

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
export const createUserDocumentFromAuth = async ({ uid, displayName, email, ...additionalInformation }) => {
    const userDocRef = doc(db, 'users', uid);
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName, email, createdAt            });
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

const createDocument = async (id, collectionName, fields) => {
    const docRef = doc(db, collectionName, id);
    const snapshot = await getDoc(docRef);

    if (!snapshot.exists()) {
        const createdAt = new Date();

        const orderObject = {
            id, createdAt, ...fields
        };

        try {
            await setDoc(docRef, orderObject);
        } catch (error) {
            console.log('error creating item', error.message);
        }
    }

    return docRef;
}

export const createOrderDocument = async ({ id, ...fields }) => {
    return createDocument(id, 'orders', fields);
}