import './navigation.styles.scss';
import { Outlet, Link } from "react-router-dom";

const Navigation = () => {
    return (
        <>
            <div className='navigation'>
                <div className='logo-container'>
                    <Link className='logo' to='/'>Home</Link>
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