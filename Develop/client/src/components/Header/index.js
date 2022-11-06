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
                    <Link to='/'>Home</Link>
                    {Auth.loggedIn() ? (
                    <>
                        {Auth.checkAdmin() ? (
                        <>
                            <Link to='/projects'>Projects</Link>
                            <Link to='/equipment'>Equipment</Link>
                            <Link to='/employees'>Employees</Link>
                            <Link to='/timesheets'>Timesheets</Link>
                        </>
                        ) : (
                        <>
                        </>
                        )}
                        <Link to='/create'>Create</Link>
                        <Link onClick={logout} className='log'>Logout</Link>
                        </>
                    ) : (
                    <>
                        <Link to='/login' className='log'>Login</Link>
                        <Link to='/signup' className='log'>Signup</Link>
                    </>
                    )} 
                </nav>
            </div>
        </header>
    );
};

export default Header;
