import { signInWithGooglePopup } from "../../util/firebase.util";

const Login = () => {
    const logGoogleUser = async () => {
        const response = await signInWithGooglePopup();
        console.log(response);
    }
    return (
        <>
            <h1>Login</h1>
            <button onClick={logGoogleUser}>Sign in With Google Popup</button>
        </>
    );
};

export default Login;