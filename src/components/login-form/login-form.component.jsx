import './login-form.styles.scss';
import { useState } from "react";

import {
    signInWithGooglePopup,
    signInAuthUserWithEmailAndPassword,
} from '../../utils/firebase.util';

import Button from '../button/button.component';
import FormInput from '../form-input/form-input.component';
import { Link } from 'react-router-dom';

const defaultFormFields = {
    email: '',
    password: '',
}

const LoginForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const resetFormFields = () => {
        setFormFields({ ...formFields, password: '' });
    }

    const signInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup();
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
        <div className='login-container authentication-form-container'>
            <h1>Log in to your account</h1>
            <form onSubmit={ (e) => {console.log('hey'); handleSubmit(e); } }>
                <FormInput label='Email' type='email' required onChange={ handleChange } name='email' value={ email } />
                <FormInput label='Password' type='password' required onChange={ handleChange } name='password' value={ password } />

                <div className='buttons-container'>
                    <Button type='submit' buttonType='inverted'>Sign In</Button>
                    <Button buttonType='google' onClick={ (e) => { e.preventDefault(); signInWithGoogle(); } }>Google Sign In</Button>
                </div>

                <div className='sign-up-message'>Don't have an account? Sign up <Link to='/signup'>here</Link>.</div>
            </form>
        </div>
    )
};

export default LoginForm;