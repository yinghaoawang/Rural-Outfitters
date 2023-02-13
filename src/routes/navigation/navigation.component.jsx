import './navigation.styles.scss';
import Logo from '../../assets/logo.png';
import { Outlet, Link } from "react-router-dom";

const Navigation = () => {
    return (
        <>
            <div className='navigation'>
                <div className='logo-container'>
                    <Link to='/'>
                        <img alt='Home' className='logo' src={Logo} />
                    </Link>
                </div>
                <div className='nav-links-container'>
                    <Link className='nav-link' to='/login'>Login</Link>
                    <Link className='nav-link' to='/sign-up'>Sign Up</Link>
                </div>
            </div>
            <Outlet />
        </>
    )
};

export default Navigation;