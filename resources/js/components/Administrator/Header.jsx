import React, { useContext, useEffect, useState } from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import { useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export function HeaderAdministrator() {
    const location = useLocation(); // Obtiene la ubicación actual para manejar la navegación
    const { user } = useContext(AuthContext);
    const [ token, setToken] = useState();
    
    useEffect(()=>{
        // Obtener el token CSRF
        fetch('/api/csrf-token')
            .then(res => res.json())
            .then(res => {
                setToken(res.csrf_token); // Almacenar token CSRF
            });
    }, [])

    const handleLogout = ()=>{
        const headers = new Headers();
        headers.append('X-CSRF-TOKEN', token); // Agrega el token CSRF
        headers.append('Accept', 'application/json'); // Indica que espera respuesta en JSON

        const config = {
            method: 'GET', // Método de la solicitud
            headers: headers, // Encabezados configurados
            mode: "cors", // Modo de la solicitud
            cache: 'no-cache', // Sin caché
        };
        fetch('/api/logout', config)
            .then(res=>res.json())
            .then(res=>{ 
                console.log(res)
                if(res.status === 200){
                    window.location.href = '/'
                }
            })
    }
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

                            {/* Menú desplegable */}
                            {
                                user 
                                &&<NavDropdown title={user.name} id="basic-nav-dropdown" className="justify-content-end">
                                    <NavDropdown.Item href={'/dashboard/users/modify/'+user.id}>Edit User</NavDropdown.Item>
                                    <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                                </NavDropdown> 
                            }
                            
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}
