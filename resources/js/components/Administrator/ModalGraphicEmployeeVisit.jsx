import React, { useEffect, useState } from "react";
import { Button, Spinner, Table } from "react-bootstrap";
import { Link } from "react-router-dom";


export function ModalGraphicEmployeeVisit() {
    const [user, setUser] = useState(); // Estado para almacenar los usuarios
    const [visit, setVisit] = useState(); // Estado para almacenar las visitas pendientes

    useEffect(() => {
        // Se realiza una solicitud para obtener los primeros 4 usuarios con el rol de empleado
        fetch('/api/users/?limit=4&role=employee')
            .then(res => res.json()) // Se convierte la respuesta a formato JSON
            .then(res => {
                // Si la respuesta es exitosa (status 200), se actualiza el estado de usuarios
                if (res.status === 200) {
                    setUser(res.data);
                }
            });
        
        // Se realiza una solicitud para obtener las primeras 4 visitas pendientes
        fetch('/api/visit/?pending_visit=true&limit=4&visited=no')
            .then(res => res.json()) // Se convierte la respuesta a formato JSON
            .then(res => {
                // Si la respuesta es exitosa (status 200), se actualiza el estado de visitas
                if (res.status === 200) {
                    setVisit(res.data);
                }
            });
    }, []);


    return (
        <div className="content-graphic">
            {/* Sección para mostrar las visitas urgentes */}
            <div style={{ height: "280px", width: "100%", padding: "0 10px" }}>
                <h5 style={{ width: "100%", textAlign: "center" }}>
                    Scheduled Visits Needing Immediate Attention
                </h5>
                {visit // Comprueba si hay datos de visitas
                    ? (
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Name</th>     {/* Columna para el nombre del visitante */}
                                    <th>Email</th>     {/* Columna para el email del visitante */}
                                    <th>Phone</th>    {/* Columna para el teléfono del visitante */}
                                    <th>Visualise</th> {/* Columna para la acción de visualizar más detalles */}
                                </tr>
                            </thead>
                            <tbody>
                                {/* Soporta solo 4 componentes */}
                                {visit.length !== 0 // Comprueba si hay visitas disponibles
                                    ? visit.map(item => ( // Mapea las visitas y crea filas en la tabla
                                        <tr key={item.name}> {/* Usa el nombre como clave única para la fila */}
                                            <td>{item.name}</td>    {/* Muestra el nombre del visitante */}
                                            <td>{item.email}</td>   {/* Muestra el email del visitante */}
                                            <td>{item.phone}</td>   {/* Muestra el teléfono del visitante */}
                                            <td>
                                                <Link>
                                                    <Button variant="secondary" style={{ width: "100%", padding: "0px 0" }}>View</Button>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                    : <tr>
                                        <td colSpan={4} style={{ textAlign: "center" }}>No visits pending.</td> {/* Mensaje si no hay visitas pendientes */}
                                    </tr>
                                }
                            </tbody>
                        </Table>
                    )
                    : <div style={{ height: "100%", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Spinner animation="border" /> {/* Spinner de carga mientras se obtienen los datos */}
                    </div>
                }
            </div>

            {/* Sección para mostrar los empleados */}
            <div style={{ height: "280px", width: "100%", padding: "0 10px" }}>
                <h5 style={{ width: "100%", textAlign: "center" }}>
                    Scheduled Visits Needing Immediate Attention
                </h5>
                {
                    user // Comprueba si hay datos de empleados
                        ? (
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Name</th>    {/* Columna para el nombre del empleado */}
                                        <th>Email</th>     {/* Columna para el email del empleado */}
                                        <th>Role</th>     {/* Columna para el rol del empleado */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Soporta solo 4 componentes */}
                                    {user.length !== 0 // Comprueba si hay empleados disponibles
                                        ? user.map(item => ( // Mapea los empleados y crea filas en la tabla
                                            <tr key={item.name}> {/* Usa el nombre como clave única para la fila */}
                                                <td>{item.name}</td>    {/* Muestra el nombre del empleado */}
                                                <td>{item.email}</td>   {/* Muestra el email del empleado */}
                                                <td>{item.role}</td>    {/* Muestra el rol del empleado */}
                                            </tr>
                                        ))
                                        : <tr>
                                            <td colSpan={3} style={{ textAlign: "center" }}>No employees.</td> {/* Mensaje si no hay empleados */}
                                        </tr>
                                    }
                                </tbody>
                            </Table>
                        )
                        : <div style={{ height: "100%", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Spinner animation="border" /> {/* Spinner de carga mientras se obtienen los datos */}
                        </div>
                }
            </div>
        </div>
    )
}