import React, { useContext, useEffect, useState } from "react";
import { HeaderAdministrator } from "../components/Administrator/Header";
import { AuthContext } from "../context/AuthContext";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import { Spinner } from "react-bootstrap";

export function UsersAdministrator() {
    // Extraemos el usuario y el estado de inicio de sesión del contexto de autenticación
    const { user, loginSuccessful } = useContext(AuthContext);
    const [data, setData] = useState(); // Estado para almacenar los datos de los usuarios

    // useEffect para obtener la lista de usuarios al montar el componente
    useEffect(() => {
        fetch('/api/users')
            .then(res => res.json())
            .then(res => {
                // Si la respuesta es exitosa, se guarda la data
                if (res.status === 200) {
                    setData(res.data);
                }
            })
            .catch(err => console.log(err)); // Manejo de errores en la solicitud
    }, []);

    return (
        <>
            {
                loginSuccessful ? ( // Verificamos si el inicio de sesión fue exitoso
                    <>
                        <HeaderAdministrator /> {/* Componente del encabezado del administrador */}
                        <div style={{ marginTop: "30px", padding: "0 10px" }}>
                            <div style={{ textAlign: "center", width: "100%" }}>
                                <h1>Users</h1> {/* Título de la sección */}
                            </div>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th>Modify</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data && data.map((item) => ( // Mapeamos los datos de los usuarios para mostrarlos en la tabla
                                            <tr key={item.id}>
                                                <td style={{ textAlign: "center", width: "10px" }}>{item.id}</td>
                                                <td>{item.name}</td>
                                                <td>{item.email}</td>
                                                <td>{item.role}</td>
                                                <td style={{ width: '50px' }}>
                                                    <Link to={'/dashboard/users/modify/' + item.id} style={{ width: "min-content" }}>
                                                        <Button variant="warning">Modify</Button> {/* Botón para modificar el usuario */}
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </Table>

                            <div style={{ display: "flex", width: "100%", justifyContent: "center", marginTop: "20px" }}>
                                <Link to={'/dashboard/users/create'}>
                                    <Button variant="primary">Add User</Button> {/* Botón para agregar un nuevo usuario */}
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
