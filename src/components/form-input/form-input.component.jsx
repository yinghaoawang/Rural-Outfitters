import './form-input.styles.scss';

const FormInput = ({ label, ...props }) => {
    return (
        <div className='group'>
            <label className='form-input-label'>{ label }</label>
            <input className='form-input' { ...props } />
        </div>
    );
}

export default FormInput;