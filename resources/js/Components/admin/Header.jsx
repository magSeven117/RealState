import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export function HeaderAdministrator({ user }) {

    return (
        <>
            {/* Barra de navegación principal */}
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container >
                    {/* Nombre del área de administración */}
                    <Navbar.Brand href="/dashboard">Administer</Navbar.Brand>

                    {/* Botón para alternar la visualización del menú en dispositivos móviles */}
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />

                    {/* Contenido de la barra de navegación */}
                    <Navbar.Collapse id="basic-navbar-nav" style={{ visibility:"visible" }}>
                        <Nav className="me-auto">
                            {/* Enlaces de navegación */}
                            <Nav.Link href="/dashboard" active={location.pathname === "/dashboard"}>Home</Nav.Link>
                            <Nav.Link href="/dashboard/users" active={location.pathname === "/dashboard/users"}>Users</Nav.Link>
                            <Nav.Link href="/dashboard/properties" active={location.pathname === "/dashboard/properties"}>Properties</Nav.Link>
                            <Nav.Link href="/dashboard/visit" active={location.pathname === "/dashboard/visit"}>Schedules Visits</Nav.Link>

                            
                            <NavDropdown title={user.name} id="basic-nav-dropdown" className="justify-content-end">
                                <NavDropdown.Item href={'/dashboard/user/update/'+user.id}>Edit User</NavDropdown.Item>
                                <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
                            </NavDropdown> 
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}
