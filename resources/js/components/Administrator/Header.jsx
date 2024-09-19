import React from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import { useLocation } from "react-router-dom";

export function HeaderAdministrator({ }) {
    const location = useLocation();

    return(
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="/dashboard">Area Admin</Navbar.Brand>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />

                    <Navbar.Collapse id="basic-navbar-nav">

                    <Nav className="me-auto">
                        <Nav.Link href="/dashboard" active={location.pathname == "/dashboard" ? true : false }>Home</Nav.Link>
                        <Nav.Link href="/dashboard/users" active={location.pathname == "/dashboard/users" ? true : false }>Users</Nav.Link>
                        <Nav.Link href="/dashboard/properties" active={location.pathname == "/dashboard/properties" ? true : false }>Properties</Nav.Link>
                        <Nav.Link href="/dashboard/visit" active={location.pathname == "/dashboard/visit" ? true : false }>Show visit</Nav.Link>
                        <Nav.Link href="/dashboard/logout">Logout</Nav.Link>

                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>

                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}