import React, { useEffect, useState } from "react";
import { Button, Spinner, Table } from "react-bootstrap";
import { Link } from "react-router-dom";


export function ModalTablePropertiesCreated() {
    // Importa el hook useState para manejar el estado local y useEffect para manejar efectos secundarios.
    const [house, setHouse] = useState(); // Inicializa el estado 'house' como indefinido.

    // useEffect se ejecuta una vez cuando el componente se monta.
    useEffect(() => {
        // Realiza una solicitud fetch para obtener las casas, limitando a 3 resultados y ordenando de manera descendente.
        fetch('/api/houses?limit=3&orderBy=desc')
            .then(res => res.json()) // Convierte la respuesta en JSON.
            .then(res => {
                // Verifica si la respuesta tiene un estado 200 (éxito).
                if (res.status === 200)
                    setHouse(res.data); // Actualiza el estado 'house' con los datos obtenidos.
            })
    }, []); // La lista de dependencias está vacía, lo que significa que solo se ejecutará una vez al montar el componente.

    return (
        <div className="content-properties"> {/* Contenedor principal para las propiedades. */}
            <h5 style={{ width: "100%", textAlign: "center" }}>Latest properties created</h5> {/* Título del contenedor. */}
            
            {
                house // Verifica si 'house' tiene datos.
                    ? <Table striped bordered hover> {/* Renderiza una tabla si hay datos. */}
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
                    : <div style={{ height: "100%", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Spinner animation="border" /> {/* Spinner que se muestra mientras se cargan los datos. */}
                    </div>
            }
        </div>
    );
}