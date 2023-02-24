import './navigation.styles.scss';
import Logo from '../../assets/logo.svg';
import { Outlet, Link } from "react-router-dom";

import {  useEffect, useState } from 'react';
import { signOutAuthUser } from '../../utils/firebase.util';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import { useDispatch, useSelector } from 'react-redux';
import { setIsCartOpen } from '../../store/cart/cart.action';
import { selectIsCartOpen } from '../../store/cart/cart.selector';
import { selectCurrentUser } from '../../store/user/user.selector';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import AccountDropdown from '../../components/account-dropdown/account-dropdown.component';

const Navigation = () => {
    const dispatch = useDispatch();
    const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
    const isCartOpen = useSelector(selectIsCartOpen);
    const currentUser = useSelector(selectCurrentUser);
    const signOutHandler = async () => {
        await signOutAuthUser();
    }
    const cartClickHandler = () => {
        dispatch(setIsCartOpen(!isCartOpen));
    }
    const accountDropdownClickHandler = () => {
        setIsAccountDropdownOpen(!isAccountDropdownOpen);
    }

    return (
        <>
            <div className='navigation'>
                <div className='logo-container'>
                    <Link to='/'>
                        <img alt='Home' className='logo' src={Logo} />
                    </Link>
                </div>
                <div className='nav-links-container'>
                    <Link className='nav-link' to='/shop'>Shop</Link>
                    { currentUser 
                        ? (
                            <>
                                <Link className='nav-link account-dropdown-relative' onClick={ accountDropdownClickHandler } to='#'>Account</Link>
                                <AccountDropdown
                                    className={`${ isAccountDropdownOpen ? 'open' : '' }`}
                                    setIsDropdownOpen={ setIsAccountDropdownOpen }
                                >
                                    <Link onClick={ () => setIsAccountDropdownOpen(false) } className='dropdown-link' to='/'>My Orders</Link>
                                    <Link onClick={ (e) => { setIsAccountDropdownOpen(false); signOutHandler(e); } } className='dropdown-link' to='#'>Logout</Link>
                                </AccountDropdown>
                            </>
                        )
                        : <Link className='nav-link' to='/login'>Login</Link>
                    }
                    <Link className='nav-link cart-dropdown-relative' onClick={ cartClickHandler } to='#'><CartIcon size={ 22 } /></Link>
                    <CartDropdown className={ `${ isCartOpen ? 'open' : '' }` } />
                </div>
            </div>
            <Outlet  />
        </>
    );
};

export default Navigation;