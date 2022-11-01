import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import Logo from '../../images/logo.png';


// if (Auth.checkAdmin()) {
//     const renderAdmin = 'View Timesheets';
//     console.log(renderAdmin);
// } else {
//     const renderAdmin = '';
//     console.log(renderAdmin);
// };

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
                    {Auth.checkAdmin() ? (
                        <>
                        <Link to='/projects'>Projects</Link>
                        <Link to='/employees'>Employees</Link>
                        <Link to='/timesheets'>Timesheets</Link>
                        </>
                    ) : (
                        <>
                        </>
                    )}
                    <Link to='/create'>Create</Link>
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
