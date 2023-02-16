import './navigation.styles.scss';
import Logo from '../../assets/logo.png';
import { Outlet, Link } from "react-router-dom";

import { useContext } from 'react';
import { UserContext } from '../../contexts/user.context';
import { signOutAuthUser } from '../../utils/firebase.util';

const Navigation = () => {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const signOutHandler = async () => {
        await signOutAuthUser();
        setCurrentUser(null);
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
                    { currentUser 
                        ? <Link className='nav-link' onClick={ signOutHandler } to='#'>Logout</Link>
                        : <Link className='nav-link' to='/login'>Login</Link>
                    }
                    
                </div>
            </div>
            <Outlet />
        </>
    )
};

export default Navigation;