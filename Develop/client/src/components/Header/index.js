import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import Logo from '../../images/logo.png';

const Header = () => {

    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
        window.location.assign('/');
    };

    return (
        <header>
            <div className='logo-span'> 
                <img src={Logo} className='logo' alt='logo'></img>
            </div>
            <div className='nav-span'>
                <nav>
                    <Link to='/' className='nav-link'>Home</Link>
                    {Auth.loggedIn() ? (
                    <>
                    {Auth.checkAdmin() ? (
                    <>
                        <Link to='/projects' className='nav-link'>Projects</Link>
                        <Link to='/equipment' className='nav-link'>Equipment</Link>
                        <Link to='/employees' className='nav-link'>Employees</Link>
                        <Link to='/timesheets' className='nav-link'>Timesheets</Link>
                    </>
                    ) : (
                    <>
                    </>
                    )}
                    {/* <Link to='/create' className='nav-link'>Create</Link> */}
                    <Link onClick={logout} className='login nav-link'>Logout</Link>
                    </>
                    ) : (
                    <>
                    <Link to='/login' className='login nav-link'>Login</Link>
                    <Link to='/signup' className='signup nav-link'>Signup</Link>
                    </>
                    )} 
                </nav>
            </div>
        </header>
    );
};

export default Header;
