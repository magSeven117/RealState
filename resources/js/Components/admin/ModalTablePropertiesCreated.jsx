import React from "react";
import { Button, Table } from "react-bootstrap";
import { Link } from "@inertiajs/react";


export function ModalTablePropertiesCreated({ house }) {
    return (
        <div className="content-properties"> {/* Contenedor principal para las propiedades. */}
            <h5 style={{ width: "100%", textAlign: "center" }}>Latest properties created</h5> {/* Título del contenedor. */}
            
            <Table striped bordered hover> {/* Renderiza una tabla si hay datos. */}
                <thead>
                    <tr> {/* Encabezados de la tabla. */}
                        <th>Photo</th> {/* Columna para la foto. */}
                        <th>Address</th> {/* Columna para la dirección. */}
                        <th>Status</th> {/* Columna para el estado. */}
                    </tr>
                </thead>
                <tbody>
                    {/* Soporta solo tres componentes */}
                    {
                        house.map(item => { // Mapea a través de cada elemento en 'house'.
                            return (
                                <tr key={item.address}> {/* Cada fila debe tener una clave única. */}
                                    <td style={{ width: "50px" }}> {/* Celda para la imagen. */}
                                        <img src={item.images[0]} style={{ width: "70px" }} /> {/* Muestra la primera imagen. */}
                                    </td>
                                    <td>{item.address}</td> {/* Muestra la dirección de la propiedad. */}
                                    <td>
                                        <Link> {/* Componente Link para navegación. */}
                                            <Button variant="secondary" style={{ width: "100%" }}>View</Button> {/* Botón para ver más detalles. */}
                                        </Link>
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </Table>
            
        </div>
    );
}