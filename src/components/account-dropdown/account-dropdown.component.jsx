import { useEffect } from 'react';
import Dropdown from '../dropdown/dropdown.component';
import './account-dropdown.styles.scss';

const AccountDropdown = ({ className, setIsDropdownOpen, children, ...props }) => {
    const accountDropdownOutsideClickHandler = (event) => {
        const { target } = event;
        if (target.closest('.account-dropdown-relative')) return ;

        setIsDropdownOpen(false);
        event.stopPropagation();
    }

    useEffect(() => {
        document.addEventListener('mousedown', accountDropdownOutsideClickHandler);
        return () => document.removeEventListener('mousedown', accountDropdownOutsideClickHandler);
    }, []);

    return (
        <Dropdown className={ `account-dropdown-relative account-dropdown-container ${ className }` } { ...props }>
            { children }
        </Dropdown>
    );
}

export default AccountDropdown;