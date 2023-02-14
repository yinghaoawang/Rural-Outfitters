import './authentication.styles.scss';
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import LoginForm from '../../components/login-form/login-form.component';

const Authentication = () => {
    return (
        <div className='authentication-container'>
            <LoginForm />
            <SignUpForm />
        </div>
    );
};

export default Authentication;