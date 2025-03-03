import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from '@inertiajs/react';

export function HeaderAdministrator({ user }) {
    const permissions = Array();

    user.roles.forEach(element => {
        element.permissions.forEach(item => {
            permissions.push(item.name); 
        });
    });
    
    return (
        <>
            {/* Barra de navegación principal */}
            <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="dark">
                <Container >
                    {/* Nombre del área de administración */}
                    <Navbar.Brand as={Link} href="/dashboard">Administer</Navbar.Brand>

                    {/* Botón para alternar la visualización del menú en dispositivos móviles */}
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />

                    {/* Contenido de la barra de navegación */}
                    <Navbar.Collapse id="basic-navbar-nav" style={{ visibility:"visible" }}>
                        <Nav className="me-auto">
                            {/* Enlaces de navegación */}
                            <Nav.Link as={Link} href="/dashboard" active={location.pathname === "/dashboard"}>Home</Nav.Link>
                            
                            <NavDropdown 
                                title="Access Control" 
                                id="basic-nav-dropdown" 
                                className={ permissions.includes("users") ? "justify-content-end" : "hidden" } 
                                active={location.pathname.includes("users")}
                            >
                                <NavDropdown.Item as={Link} href="/dashboard/users">Users</NavDropdown.Item>
                                <NavDropdown.Item as={Link} href="/dashboard/users/roles">Roles</NavDropdown.Item>
                                <NavDropdown.Item as={Link} href="/dashboard/users/permissions">Permissions</NavDropdown.Item>
                            </NavDropdown>
                            
                            <Nav.Link 
                                as={Link} 
                                href="/dashboard/properties" 
                                active={location.pathname.includes("properties")}
                                className={ permissions.includes("properties") ? "" : "hidden" } 
                            >
                                Properties
                            </Nav.Link>
                            
                            <NavDropdown 
                                title="Visit Management" 
                                id="basic-nav-dropdown" 
                                className={ permissions.includes("users") ? "justify-content-end" : "hidden" } 
                                active={location.pathname.includes("visit")}
                            >
                                <NavDropdown.Item as={Link} href="/dashboard/visit">Scheduled Visits</NavDropdown.Item>
                                <NavDropdown.Item as={Link} href="/dashboard/visit/pending">Pending Visits</NavDropdown.Item>
                                <NavDropdown.Item as={Link} href="/dashboard/visit/visited">Completed Visits</NavDropdown.Item>
                            </NavDropdown>

                            
                            <NavDropdown title={user.name} id="basic-nav-dropdown" className="justify-content-end">
                                <NavDropdown.Item as={Link} href={'/dashboard/users/update/'+user.id}>Edit User</NavDropdown.Item>
                                <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
                            </NavDropdown> 
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}
