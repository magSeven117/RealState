import React, { useContext, useEffect, useState } from "react";
import { HeaderAdministrator } from "../components/Administrator/Header"; // Componente del encabezado del administrador
import { AuthContext } from "../context/AuthContext"; // Contexto de autenticación
import { Spinner } from "react-bootstrap"; // Componente Spinner de react-bootstrap para mostrar carga
import Table from 'react-bootstrap/Table'; // Componente Table de react-bootstrap
import Button from 'react-bootstrap/Button'; // Componente Button de react-bootstrap
import { Link } from "react-router-dom"; // Para navegación entre rutas

export function PropertiesAdministrator() {
    const { loginSuccessful } = useContext(AuthContext); // Accedemos al estado de inicio de sesión desde el contexto
    const [properties, setProperties] = useState(); // Estado para almacenar las propiedades

    // useEffect para cargar las propiedades desde la API al montar el componente
    useEffect(() => {
        fetch('/api/houses')
            .then(res => res.json())
            .then(res => {
                setProperties(res.data); // Guardamos los datos de las propiedades en el estado
                console.log(res); // Mostramos la respuesta en la consola para depuración
            })
            .catch(err => console.log(err)); // Manejo de errores en la solicitud
    }, []);

    return (
        <>
            {
                loginSuccessful ? ( // Comprobamos si el inicio de sesión fue exitoso
                    <>
                        <HeaderAdministrator /> {/* Encabezado del administrador */}
                        <div style={{ marginTop: "30px", padding: "0 10px" }}>
                            <div style={{ textAlign: "center", width: "100%" }}>
                                <h1>Properties</h1> {/* Título de la sección */}
                            </div>
                            <Table striped bordered hover> {/* Tabla para mostrar las propiedades */}
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Photo</th>
                                        <th>Address</th>
                                        <th>Status</th>
                                        <th>Modify</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        properties && properties.map((item) => ( // Mapeamos las propiedades para mostrarlas en la tabla
                                            <tr key={item.id}>
                                                <td style={{ textAlign: "center", width: "10px" }}>{item.id}</td>
                                                <td style={{ width: "50px" }}>
                                                    <img src={item.images[0]} alt={"house" + item.id} style={{ width: "70px" }} /> {/* Imagen de la propiedad */}
                                                </td>
                                                <td>
                                                    {item.address} {/* Dirección de la propiedad */}
                                                </td>
                                                <td>
                                                    <span>Public</span> {/* Estado de la propiedad */}
                                                </td>
                                                <td style={{ width: '50px' }}>
                                                    <Link to={'/dashboard/properties/modify/' + item.id} style={{ width: "min-content" }}>
                                                        <Button variant="warning">Modify</Button> {/* Botón para modificar la propiedad */}
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </Table>

                            <div style={{ display: "flex", width: "100%", justifyContent: "center", marginTop: "20px" }}>
                                <Link to={'/dashboard/properties/create'}>
                                    <Button variant="primary">Add Property</Button> {/* Botón para agregar una nueva propiedad */}
                                </Link>
                            </div>
                        </div>
                    </>
                ) : (
                    // Si no se ha iniciado sesión, se muestra un spinner de carga
                    <div style={{ height: "100vh", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Spinner animation="border" />
                    </div>
                )
            }
        </>
    );
}
