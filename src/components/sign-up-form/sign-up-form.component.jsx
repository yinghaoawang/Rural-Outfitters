import { useState } from "react";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../util/firebase.util';

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
        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, { displayName });

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
        <div>
            <form onSubmit={handleSubmit}>
                <h1>Sign Up</h1>
                <FormInput label='Display Name' type='text' required onChange={ handleChange } name='displayName' value={ displayName }/>
                <FormInput label='Email' type='email' required onChange={ handleChange } name='email' value={ email } />
                <FormInput label='Password' type='password' required onChange={ handleChange } name='password' value={ password } />
                <FormInput label='Confirm Password' type='password' required onChange={ handleChange } name='confirmPassword' value={ confirmPassword } />
                <Button buttonType='inverted' type='submit'>Sign up</Button>
            </form>
        </div>
    );
};

export default SignUpForm;