import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import Logo from '../../images/logo.png';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const Header = () => {

    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
        window.location.assign('/');
    };

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand><img src={Logo} className='logo' alt='logo'></img></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        {Auth.loggedIn() ? (
                            <>
                            {Auth.checkAdmin() ? (
                                <>
                                <NavDropdown title="Manage" id="collasible-nav-dropdown">
                                    <NavDropdown.Item href="/projects">Projects</NavDropdown.Item>
                                    <NavDropdown.Item href="/equipment">Equipment</NavDropdown.Item>
                                    <NavDropdown.Item href="/employees">Employees</NavDropdown.Item>
                                    <NavDropdown.Item href="/timesheets">Timesheets</NavDropdown.Item>
                                </NavDropdown>
                                </>
                            ) : (
                                <>
                                </>
                            )}
                            <Nav>
                                <Nav.Link onClick={logout}>Logout</Nav.Link>
                            </Nav>
                            </>
                        ) : (
                            <>
                            <Nav.Link href="/login">Login</Nav.Link>
                            <Nav.Link href="/signup">Signup</Nav.Link>
                            </>
                        )}
                    </Nav>
                    
                </Navbar.Collapse>
            </Container>
        </Navbar>
        // <header>
        //     <div className='logo-span'> 
        //         <img src={Logo} className='logo' alt='logo'></img>
        //     </div>
        //     <div className='nav-span'>
        //         <nav>
        //             <Link to='/' className='nav-link'>Home</Link>
        //             {Auth.loggedIn() ? (
        //             <>
        //             {Auth.checkAdmin() ? (
        //             <>
        //                 <Link to='/projects' className='nav-link'>Projects</Link>
        //                 <Link to='/equipment' className='nav-link'>Equipment</Link>
        //                 <Link to='/employees' className='nav-link'>Employees</Link>
        //                 <Link to='/timesheets' className='nav-link'>Timesheets</Link>
        //             </>
        //             ) : (
        //             <>
        //             </>
        //             )}
        //             <Link onClick={logout} className='login nav-link'>Logout</Link>
        //             </>
        //             ) : (
        //             <>
        //             <Link to='/login' className='login nav-link'>Login</Link>
        //             <Link to='/signup' className='signup nav-link'>Signup</Link>
        //             </>
        //             )} 
        //         </nav>
        //     </div>
        // </header>
    );
};

export default Header;