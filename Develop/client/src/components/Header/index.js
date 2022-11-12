import React from 'react';
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
                <Navbar.Brand><Nav.Link href="/"><img src={Logo} className='logo' alt='logo'></img></Nav.Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        {Auth.loggedIn() ? (
                            <>
                            <Nav.Link href="/profile">Profile</Nav.Link>
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
    );
};

export default Header;