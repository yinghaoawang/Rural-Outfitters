import './navigation.styles.scss';
import Logo from '../../assets/logo.svg';
import { Outlet, Link } from "react-router-dom";

import {  useEffect } from 'react';
import { signOutAuthUser } from '../../utils/firebase.util';
import { BiCart as CartIcon } from 'react-icons/bi';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import { useDispatch, useSelector } from 'react-redux';
import { setIsCartOpen } from '../../store/cart/cart.action';
import { selectIsCartOpen } from '../../store/cart/cart.selector';
import { selectCurrentUser } from '../../store/user/user.selector';

const Navigation = () => {
    const dispatch = useDispatch();
    const isCartOpen = useSelector(selectIsCartOpen);
    const currentUser = useSelector(selectCurrentUser);
    const signOutHandler = async () => {
        await signOutAuthUser();
    }
    const cartClickHandler = () => {
        dispatch(setIsCartOpen(!isCartOpen));
    }
    const outsideClickHandler = (event) => {
        const { target } = event;
        const ignoreClickElements = document.getElementsByClassName('ignore-outside-click');
        for (let ignoreClickElement of ignoreClickElements) {
            if (ignoreClickElement.contains(target)) return;
        }
        
        dispatch(setIsCartOpen(false));
    }

    useEffect(() => {
        document.addEventListener('mousedown', outsideClickHandler);
        return () => document.removeEventListener('mousedown', outsideClickHandler);
    }, []);

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
                        ? <Link className='nav-link' onClick={ signOutHandler } to='#'>Logout</Link>
                        : <Link className='nav-link' to='/login'>Login</Link>
                    }
                    <Link className='nav-link ignore-outside-click' onClick={ cartClickHandler } to='#'><CartIcon size={ 22 } /></Link>
                    { isCartOpen && <CartDropdown className='ignore-outside-click' /> }
                </div>
            </div>
            <Outlet  />
        </>
    );
};

export default Navigation;