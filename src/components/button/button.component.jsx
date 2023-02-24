import './button.styles.scss';

const ButtonTypeClasses = {
    google: 'google-sign-in',
    inverted: 'inverted',
    checkout: 'checkout'
}

const Button = ({ children, buttonType, className, ...props }) => {
    return (
        <button className={`button-container ${ ButtonTypeClasses[buttonType] } ${ className } `} { ...props }>{ children }</button>
    );
}

export default Button;