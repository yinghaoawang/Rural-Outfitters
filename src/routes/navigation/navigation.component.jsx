import './navigation.styles.scss';
import Logo from '../../assets/logo.svg';
import { Outlet, Link } from "react-router-dom";

import { useContext } from 'react';
import { UserContext } from '../../contexts/user.context';
import { signOutAuthUser } from '../../utils/firebase.util';
import { BiCart as CartIcon } from 'react-icons/bi';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import { CartContext } from '../../contexts/cart.context';

const Navigation = () => {
    const { isCartOpen, setIsCartOpen } = useContext(CartContext);
    const { currentUser } = useContext(UserContext);
    const signOutHandler = async () => {
        await signOutAuthUser();
    }
    const cartClickHandler = () => {
        setIsCartOpen(!isCartOpen);
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
                        ? <Link className='nav-link' onClick={ signOutHandler } to='#'>Logout</Link>
                        : <Link className='nav-link' to='/login'>Login</Link>
                    }
                    <Link className='nav-link' onClick={ cartClickHandler } to='#'><CartIcon size={ 22 } /></Link>
                    { isCartOpen && <CartDropdown /> }
                </div>
            </div>
            <Outlet />
        </>
    );
};

export default Navigation;