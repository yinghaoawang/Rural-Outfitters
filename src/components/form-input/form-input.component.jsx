import './form-input.styles.scss';

const FormInput = ({ inputType, label, ...props }) => {
    if (inputType === 'checkbox') {
        return (
            <div className='group checkbox'>
                <input id={ label } type='checkbox' className='form-input' { ...props } />
                <label htmlFor={ label } className='form-input-label'>{ label }</label>
            </div>
        );
    }

    return (
        <div className='group'>
            <label className='form-input-label'>{ label }</label>
            <input className='form-input' { ...props } />
        </div>
    );
}

export default FormInput;