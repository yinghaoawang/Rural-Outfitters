import './login-form.styles.scss';
import { useState, useContext } from "react";
import { UserContext } from '../../contexts/user.context';

import {
    signInWithGooglePopup,
    signInAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth
} from '../../utils/firebase.util';

import Button from '../button/button.component';
import FormInput from '../form-input/form-input.component';

const defaultFormFields = {
    email: '',
    password: '',
}

const LoginForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const { setCurrentUser } = useContext(UserContext);

    const resetFormFields = () => {
        setFormFields({ ...formFields, password: '' });
    }

    const signInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup();
        console.log(user);
        const userDocRef = await createUserDocumentFromAuth(user);
        setCurrentUser(user);
        alert('Login successful');
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({...formFields, [name]: value});
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await signInAuthUserWithEmailAndPassword(email, password);
            const { user } = response;
            setCurrentUser(user);
            alert('Login successful');
        } catch (error) {
            const { code } = error;
            switch (error.code) {
                case 'auth/user-not-found':
                    alert('Email does not exist');
                    break;
                case 'auth/wrong-password':
                    alert('Incorrect password');
                    break;
                default:
                    alert('Unable to log in ' + code);
                    console.error('unknown error code %s', code)
            }
            resetFormFields();
        }
    }

    return (
        <div className='login-container'>
            <h1>Login</h1>
            <form onSubmit={ (e) => {console.log('hey'); handleSubmit(e); } }>
                <FormInput label='Email' type='email' required onChange={ handleChange } name='email' value={ email } />
                <FormInput label='Password' type='password' required onChange={ handleChange } name='password' value={ password } />

                <div className='buttons-container'>
                    <Button type='submit' buttonType='inverted'>Sign In</Button>
                    <Button buttonType='google' onClick={ (e) => { e.preventDefault(); signInWithGoogle(); } }>Google Sign In</Button>
                </div>
            </form>
        </div>
    )
};

export default LoginForm;