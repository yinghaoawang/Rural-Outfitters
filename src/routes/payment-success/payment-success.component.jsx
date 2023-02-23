import './payment-success.styles.scss';
import { Link } from 'react-router-dom';

const PaymentSuccess = () => {
    return (
        <div className='payment-success-container'>
            <h1>Payment success!</h1>
            <div className='message'>Click <Link to={'/shop'}>here</Link> to continue shopping.</div>
        </div>
    );
}

export default PaymentSuccess;