import { signInWithGooglePopup } from "../../util/firebase.util";
import { createUserDocumentFromAuth } from "../../util/firebase.util";

const Login = () => {
    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        console.log(user);
        const userDocRef = await createUserDocumentFromAuth(user);
        console.log(userDocRef);
    }
    return (
        <>
            <h1>Login</h1>
            <button onClick={logGoogleUser}>Sign in With Google Popup</button>
        </>
    );
};

export default Login;