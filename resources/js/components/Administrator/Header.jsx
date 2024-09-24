import React from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import { useLocation } from "react-router-dom";

export function HeaderAdministrator() {
    const location = useLocation(); // Obtiene la ubicación actual para manejar la navegación

    return (
        <>
            {/* Barra de navegación principal */}
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    {/* Nombre del área de administración */}
                    <Navbar.Brand href="/dashboard">Area Admin</Navbar.Brand>

                    {/* Botón para alternar la visualización del menú en dispositivos móviles */}
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />

                    {/* Contenido de la barra de navegación */}
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {/* Enlaces de navegación */}
                            <Nav.Link href="/dashboard" active={location.pathname === "/dashboard"}>Home</Nav.Link>
                            <Nav.Link href="/dashboard/users" active={location.pathname === "/dashboard/users"}>Users</Nav.Link>
                            <Nav.Link href="/dashboard/properties" active={location.pathname === "/dashboard/properties"}>Properties</Nav.Link>
                            <Nav.Link href="/dashboard/visit" active={location.pathname === "/dashboard/visit"}>Show visit</Nav.Link>
                            <Nav.Link href="/dashboard/logout">Logout</Nav.Link>

                            {/* Menú desplegable */}
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
