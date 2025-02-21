import React from "react";
import { Button, Table } from "react-bootstrap";
import { Link } from "@inertiajs/react";


export function ModalGraphicEmployeeVisit({ users, pending }) {
    return (
        <div className="content-graphic">
            {/* Sección para mostrar las visitas urgentes */}
            <div style={{ height: "280px", width: "100%", padding: "0 10px" }}>
                <h5 style={{ width: "100%", textAlign: "center" }}>
                    Scheduled Visits Needing Immediate Attention
                </h5>
        
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
                        {(pending && pending.length !== 0) // Comprueba si hay visitas disponibles
                            ? pending.map(item => ( // Mapea las visitas y crea filas en la tabla
                                <tr key={item.name}> {/* Usa el nombre como clave única para la fila */}
                                    <td>{item.name}</td>    {/* Muestra el nombre del visitante */}
                                    <td>{item.email}</td>   {/* Muestra el email del visitante */}
                                    <td>{item.phone}</td>   {/* Muestra el teléfono del visitante */}
                                    <td>
                                        <Link>
                                            <Button variant="secondary" style={{ width: "100%", padding: "0px 0", backgroundColor:"#FFCF50", color:"#1e1e1e", fontWeight: "600" }}>View</Button>
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
            </div>

            {/* Sección para mostrar los empleados */}
            <div style={{ height: "280px", width: "100%", padding: "0 10px" }}>
                <h5 style={{ width: "100%", textAlign: "center" }}>
                    Active employees
                </h5>
                
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
                        {(users && users.length !== 0)// Comprueba si hay empleados disponibles
                            ? users.map(item => ( // Mapea los empleados y crea filas en la tabla
                                <tr key={item.name}> {/* Usa el nombre como clave única para la fila */}
                                    <td>{item.name}</td>    {/* Muestra el nombre del empleado */}
                                    <td>{item.email}</td>   {/* Muestra el email del empleado */}
                                    <td>{item.role}</td>    {/* Muestra el rol del empleado */}
                                </tr>
                            ))
                            : <tr>
                                <td colSpan={3} style={{ textAlign: "center" }}>No active employees.</td> {/* Mensaje si no hay empleados */}
                            </tr>
                        }
                    </tbody>
                </Table>
            </div>
        </div>
    )
}