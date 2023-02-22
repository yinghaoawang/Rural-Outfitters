const {
    firebaseApiKey, firebaseAuthDomain, firebaseProjectId, firebaseStorageBucket, 
    firebaseMessagingSenderId, firebaseAppId, firebaseMeasurementId
} = process.env;

const firebaseConfig = {
    apiKey: firebaseApiKey,
    authDomain: firebaseAuthDomain,
    projectId: firebaseProjectId,
    storageBucket: firebaseStorageBucket,
    messagingSenderId: firebaseMessagingSenderId,
    appId: firebaseAppId,
    measurementId: firebaseMeasurementId
};

export { firebaseConfig };