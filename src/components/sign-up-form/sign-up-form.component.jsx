import './sign-up-form.styles.scss';
import { useState } from "react";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import { createAuthUserWithEmailAndPassword } from '../../utils/firebase.util';
import { Link } from 'react-router-dom';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const resetFormFields = () => {
        setFormFields({ ...formFields, password: '', confirmPassword: '' });
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({...formFields, [name]: value});
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            alert('Sign up successful');
        } catch (error) {
            const { code } = error;
            switch (error.code) {
                case 'auth/invalid-email':
                    alert('Email is invalid');
                    break;
                case 'auth/email-already-in-use':
                    alert('Email is already in use');
                    break;
                case 'auth/weak-password':
                    alert('Stronger password required');
                    break;
                default:
                    alert('Unable to sign up: ' + code);
                    console.error('unknown error code %s', code)
            }
            resetFormFields();
        }
        
    }

    return (
        <div className='sign-up-container authentication-form-container'>
            <form onSubmit={handleSubmit}>
                <h1>Create your account</h1>
                {/* <FormInput label='Display Name' type='text' required onChange={ handleChange } name='displayName' value={ displayName }/> */}
                <FormInput label='Email' type='email' required onChange={ handleChange } name='email' value={ email } />
                <FormInput label='Password' type='password' required onChange={ handleChange } name='password' value={ password } />
                <FormInput label='Confirm Password' type='password' required onChange={ handleChange } name='confirmPassword' value={ confirmPassword } />
                <div className='buttons-container'>
                    <Button buttonType='inverted' type='submit'>Sign Up</Button>
                </div>
                <div className='login-message'>Already have an account? Login <Link to='/login'>here</Link>.</div>
            </form>
        </div>
    );
};

export default SignUpForm;