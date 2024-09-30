import React, { useContext, useEffect, useState } from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export function HeaderAdministrator() {
    // Obtiene la ubicación actual para manejar la navegación en la aplicación
    const location = useLocation(); 
    const navigate = useNavigate();

    // Extrae el objeto user del contexto de autenticación
    const { user } = useContext(AuthContext); 

    // Inicializa un estado para el token CSRF, utilizado para la seguridad en las solicitudes
    const [token, setToken] = useState(); 

    // useEffect se ejecuta una vez al montar el componente
    useEffect(() => {
        // Obtener el token CSRF desde la API
        fetch('/api/csrf-token')
            .then(res => res.json()) // Convierte la respuesta a JSON
            .then(res => {
                // Almacena el token CSRF en el estado
                setToken(res.csrf_token); 
            });
    }, []); // Dependencias vacías para que se ejecute solo una vez

    // Función para manejar el cierre de sesión del usuario
    const handleLogout = () => {
        const headers = new Headers(); // Crea un objeto Headers para personalizar los encabezados
        headers.append('X-CSRF-TOKEN', token); // Agrega el token CSRF al encabezado
        headers.append('Accept', 'application/json'); // Indica que espera respuesta en formato JSON

        // Configuración de la solicitud
        const config = {
            method: 'POST', // Método de la solicitud HTTP
            headers: headers, // Encabezados configurados anteriormente
            mode: "cors", // Habilita CORS para la solicitud
            cache: 'no-cache', // Desactiva la caché
        };

        // Realiza la solicitud de cierre de sesión a la API
        fetch('/api/logout', config)
            .then(res => res.json()) // Convierte la respuesta a JSON
            .then(res => {
                // Verifica si la respuesta fue exitosa
                if (res.status === 200) {
                    // Redirige al usuario a la página de inicio
                    navigate('/');
                }
            });
    };
    
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
                            <Nav.Link href="/dashboard/visit" active={location.pathname === "/dashboard/visit"}>Schedules Visits</Nav.Link>

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
