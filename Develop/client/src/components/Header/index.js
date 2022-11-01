import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import Logo from '../../images/logo.png';

const Header = () => {

    const logout = (event) => {
      event.preventDefault();
      Auth.logout();
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
                        <Link onClick={logout}>Logout</Link>
                    </>
                    ) : (
                    <>
                        <Link to='/login'>Login</Link>
                        <Link to='/signup'>Signup</Link>
                    </>
                    )} 
                </nav>
            </div>
        </header>
    );
};

export default Header;
