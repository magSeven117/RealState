import React, { useContext, useEffect, useState } from "react";
import { HeaderAdministrator } from "../components/Administrator/Header";
import { AuthContext } from "../context/AuthContext";
import { Alert, Button, ButtonGroup, Spinner, Table } from "react-bootstrap";
import { HouseProvider } from "../context/houseContext";
import { ModalConfirmAlert } from "../components/Administrator/ModalConfirmAlert";
import { Link } from "react-router-dom";


export function VisitAdministrator({  }) {
    // Importa el contexto de autenticación.
    const { loginSuccessful } = useContext(AuthContext); // Obtiene el estado de inicio de sesión del contexto de autenticación.

    // Inicializa los estados usando useState.
    const [visit, setVisit] = useState(); // Estado para almacenar las visitas.
    const [token, setToken] = useState(); // Estado para almacenar el token CSRF.
    const [visited, setVisited] = useState(1); // Estado para indicar si se ha visitado.
    const [alertConfirmPending, setAlertConfirmPending] = useState(false); // Estado para mostrar alerta de confirmación de pendiente.
    const [alertConfirmVisited, setAlertConfirmVisited] = useState(false); // Estado para mostrar alerta de confirmación de visita.\
    const [alertVisited, setAlertVisited] = useState(false); // Estado para mostrar alerta de visita.
    const [alertPending, setAlertPending] = useState(false); // Estado para mostrar alerta de pendiente.
    const [alertConfirmDelete, setAlertConfirmDelete] = useState(false); // Estado para mostrar alerta de confirmación de eliminación.
    const [alertDelete, setAlertDelete] = useState(false); // Estado para mostrar alerta de eliminación.
    const [reload, setReload] = useState(false); // Estado para controlar la recarga de datos.
    const [visit_id, setVisit_id] = useState(); // Estado para almacenar el ID de la visita.
    const [selectedEmployee, setSelectedEmployee] = useState(null);


    // useEffect se ejecuta una vez al montar el componente.
    useEffect(() => {
        // Obtener el token CSRF desde el servidor.
        fetch('/api/csrf-token')
            .then(res => res.json()) // Convierte la respuesta a JSON.
            .then(res => {
                setToken(res.csrf_token); // Almacena el token CSRF en el estado.
            });
    }, []); // La lista de dependencias está vacía, lo que significa que solo se ejecuta una vez.

    // useEffect que se ejecuta cuando el token, visited o reload cambian.
    useEffect(() => {
        if (token) { // Verifica si se ha recibido el token.
            let url = ''; // Inicializa la variable de URL.

            // Sgrega el parámetro a la URL.
            if (visited == 1) {    
                url = "?pending_visit=no&visited=no";
            }

            if (visited == 2) {    
                url = "?pending_visit=yes&visited=no";
            }

            if (visited == 3) {    
                url = "?visited=yes";
            }

            const headers = new Headers(); // Crea un nuevo objeto de encabezados.
            headers.append('X-CSRF-TOKEN', token); // Agrega el token CSRF a los encabezados.
            headers.append('Accept', 'application/json'); // Indica que se espera respuesta en JSON.

            const config = {
                method: 'GET', // Método de la solicitud.
                headers: headers, // Encabezados configurados.
                mode: "cors", // Modo de la solicitud.
                cache: 'no-cache', // Sin caché.
            };

            // Realiza la solicitud fetch para obtener las visitas.
            fetch('/api/visit' + url, config)
                .then(res => res.json()) // Convierte la respuesta a JSON.
                .then(res => { 
                    if (res.data.length !== 0) { // Verifica si hay datos en la respuesta.
                        setVisit(res.data); // Almacena los datos de visita en el estado.
                    }
                });
        }
    }, [token, visited, reload]); // Dependencias del useEffect: token, visited y reload.

    // Maneja el cambio de estado de pendiente.
    const handleChangePending = () => {
        setAlertConfirmPending(false); // Cierra la alerta de confirmación de pendiente.
        
        const headers = new Headers(); // Crea un nuevo objeto de encabezados.
        headers.append('X-CSRF-TOKEN', token); // Agrega el token CSRF a los encabezados.
        headers.append('Accept', 'application/json'); // Indica que se espera respuesta en JSON.
        headers.append('Content-Type', 'application/json'); // Indica que se está enviando JSON en el cuerpo.

        const body = JSON.stringify({ employee: selectedEmployee }); // Crea el cuerpo de la solicitud en formato JSON.

        const config = {
            method: 'PUT', // Método de la solicitud.
            headers: headers, // Encabezados configurados.
            mode: "cors", // Modo de la solicitud.
            cache: 'no-cache', // Sin caché.
            body: body // Incluye el cuerpo en la solicitud.
        };

        // Realiza la solicitud fetch para marcar la visita como pendiente.
        fetch('/api/visit/pending/' + visit_id, config)
            .then(res => res.json()) // Convierte la respuesta a JSON.
            .then(res => {
                console.log(res);
                if (res.status === 200) { // Verifica si la respuesta es exitosa.
                    setReload(!reload); // Cambia el estado de recarga para obtener nuevos datos.
                    setAlertPending(true); // Muestra la alerta de visita.

                    // Oculta la alerta después de 2 segundos.
                    setTimeout(() => {
                        setAlertPending(false);
                    }, 2000);
                }
            })
            .catch(err => console.error('Error en la solicitud:', err)); // Maneja cualquier error en la solicitud.
    };

    // Maneja el cambio de estado de visitado.
    const handleChangeVisited = () => {
        setAlertConfirmVisited(false); // Cierra la alerta de confirmación de visita.
        
        const headers = new Headers(); // Crea un nuevo objeto de encabezados.
        headers.append('X-CSRF-TOKEN', token); // Agrega el token CSRF a los encabezados.
        headers.append('Accept', 'application/json'); // Indica que se espera respuesta en JSON.

        const config = {
            method: 'PUT', // Método de la solicitud.
            headers: headers, // Encabezados configurados.
            mode: "cors", // Modo de la solicitud.
            cache: 'no-cache', // Sin caché.
        };

        // Realiza la solicitud fetch para marcar la visita como visitada.
        fetch('/api/visit/visited/' + visit_id, config)
            .then(res => res.json()) // Convierte la respuesta a JSON.
            .then(res => {
                if (res.status === 200) { // Verifica si la respuesta es exitosa.
                    setReload(!reload); // Cambia el estado de recarga para obtener nuevos datos.
                    setAlertVisited(true); // Muestra la alerta de visita.

                    // Oculta la alerta después de 2 segundos.
                    setTimeout(() => {
                        setAlertVisited(false);
                    }, 2000);
                }
            });
    };

    // Maneja la eliminación de una visita.
    const handleDeleteVisit = () => {
        setAlertConfirmDelete(false); // Cierra la alerta de confirmación de eliminación.

        const headers = new Headers(); // Crea un nuevo objeto de encabezados.
        headers.append('X-CSRF-TOKEN', token); // Agrega el token CSRF a los encabezados.
        headers.append('Accept', 'application/json'); // Indica que se espera respuesta en JSON.

        const config = {
            method: 'DELETE', // Método de la solicitud.
            headers: headers, // Encabezados configurados.
            mode: "cors", // Modo de la solicitud.
            cache: 'no-cache', // Sin caché.
        };

        // Realiza la solicitud fetch para eliminar la visita.
        fetch('/api/visit/delete/' + visit_id, config)
            .then(res => res.json()) // Convierte la respuesta a JSON.
            .then(res => {
                if (res.status === 200) { // Verifica si la respuesta es exitosa.
                    setReload(!reload); // Cambia el estado de recarga para obtener nuevos datos.
                    setAlertDelete(true); // Muestra la alerta de eliminación.

                    // Oculta la alerta después de 2 segundos.
                    setTimeout(() => {
                        setAlertDelete(false);
                    }, 2000);
                }
            });
    }

    return(
        <>
            {
                loginSuccessful // Verifica si el inicio de sesión fue exitoso.
                ? <>
                    <HeaderAdministrator /> {/* Muestra el encabezado del administrador */}
                    <div style={{ marginTop: "30px", padding: "0 10px" }}>
                        <div style={{ width: "100%", display: "flex", justifyContent: "center", marginBottom: "10px" }}>
                            <ButtonGroup aria-label="Basic example"> {/* Agrupación de botones para seleccionar visitas */}
                                <Button disabled={visited == 1} onClick={() => setVisited(1)}>Scheduled visits</Button> {/* Botón para ver visitas programadas */}
                                <Button disabled={visited == 2} onClick={() => setVisited(2)}>Pending visits</Button> {/* Botón para marcar como visitado */}
                                <Button disabled={visited == 3} onClick={() => setVisited(3)}>Mark as Visited</Button> {/* Botón para marcar como visitado */}
                            </ButtonGroup>
                        </div>

                        <div style={{ textAlign: "center", width: "100%" }}>
                            {
                                visited == 1 // Verifica si se está viendo visitas programadas o visitas ya realizadas.
                                ? <h1>Scheduled visits</h1> // Título para visitas programadas
                                : <h1>Properties Visited</h1> // Título para propiedades visitadas
                            }
                        </div>
                        <Table striped bordered hover> {/* Tabla para mostrar visitas */}
                            <thead>
                                <tr>
                                    <th>ID</th> {/* Encabezado de ID */}
                                    <th>Name</th> {/* Encabezado de Nombre */}
                                    <th>Email</th> {/* Encabezado de Email */}
                                    <th>phone</th> {/* Encabezado de Teléfono */}
                                    {
                                       (visited == 2 || visited == 3) && <th>Employee</th> //Encabezado de Empleados 
                                    } 
                                    <th>Scheduled Date</th> {/* Encabezado de Fecha Programada */}
                                    <th>House</th> {/* Encabezado de Casa */}
                                    
                                    {
                                        visited == 1 ||  visited == 2
                                        ? <th>Mark</th> // Encabezado para marcar como visitado si se están viendo visitas programadas
                                        : <th>Visited</th> // Encabezado para visitas si se han visto las propiedades visitadas
                                    }
                                    <th>Delete</th> {/* Encabezado para eliminar visita */}
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    visit && visit.map((item) => ( // Mapea los datos de las visitas para mostrarlos en la tabla
                                        <tr key={item.id}>
                                            <td style={{ textAlign: "center", width: "10px" }}>{item.id}</td> {/* Muestra el ID de la visita */}
                                            <td>{item.name + " " + item.lastname}</td> {/* Muestra el nombre completo */}
                                            <td>{item.email}</td> {/* Muestra el email */}
                                            <td>{item.phone}</td> {/* Muestra el teléfono */}
                                            {
                                                (visited == 2 || visited == 3) && <td>{item.user?.name}</td> // Muestra los empleados de visited y pending
                                            }
                                            <td style={visited == 1 ? { color: "green", fontWeight: "600" } : {}}>{item.date_visit}</td> {/* Muestra la fecha de visita, color verde si son visitas programadas */}
                                            <td style={{ width: "128px" }}>
                                                <Link to={'/property-details/' + item.id + "?admin_view=true"} target="_blank"> {/* Enlace para ver detalles de la casa */}
                                                    <Button variant="success">View House</Button> {/* Botón para ver la casa */}
                                                </Link>
                                            </td>
                                            {
                                                // Visitas Generales
                                                visited == 1 // Verifica si se están viendo visitas programadas.
                                                ? <td style={{ width: '50px' }}>
                                                    <Button 
                                                        variant="secondary" 
                                                        onClick={() => {
                                                            setAlertConfirmPending(true); // Muestra la alerta de confirmación para marcar como visitado
                                                            setVisit_id(item.id); // Establece el ID de la visita
                                                        }}
                                                    >
                                                        Pending
                                                    </Button> {/* Botón para marcar como pendiente */}
                                                </td>
                                                // Pendientes
                                                : visited == 2 
                                                    ? <td style={{ width: '50px' }}>
                                                        <Button 
                                                            variant="secondary" 
                                                            onClick={() => {
                                                                setAlertConfirmVisited(true); // Muestra la alerta de confirmación para marcar como visitado
                                                                setVisit_id(item.id); // Establece el ID de la visita
                                                            }}
                                                        >
                                                            Visited
                                                        </Button> {/* Botón para marcar como pendiente */}
                                                    </td>
                                                    // Visitas ya hechas
                                                    : <th style={{ color: "green", fontWeight: "600" }}>{item.visited_date}</th> // Muestra la fecha de visita si ya se ha visitado
                                            }
                                            <td style={{ width: '50px' }}>
                                                <Button 
                                                    variant="danger" 
                                                    onClick={() => {
                                                        setAlertConfirmDelete(true); // Muestra la alerta de confirmación para eliminar visita
                                                        setVisit_id(item.id); // Establece el ID de la visita
                                                    }}
                                                >
                                                    Delete
                                                </Button> {/* Botón para eliminar visita */}
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                    </div>
                </>
                : <div style={{ height: "100vh", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Spinner animation="border" /> {/* Muestra un spinner mientras se verifica el estado de inicio de sesión */}
                </div>
            }

            {
                (alertConfirmPending || alertConfirmDelete || alertConfirmVisited) && ( // Verifica si hay alertas de confirmación activas
                    <ModalConfirmAlert 
                        title={alertConfirmPending ? 'You are about to mark this as pending.' : alertConfirmVisited ? 'You are about to mark this as visited.' :'Delete Visit.'} // Título de la alerta según la acción
                        subtitle={alertConfirmPending // Subtítulo de la alerta
                            ? "By marking it as pending, it will be moved to the 'Pending' table. Do you want to continue?" 
                            : alertConfirmVisited ? "By marking it as visited, it will be moved to the 'Visited' table. Do you want to continue?" : 'You are about to delete this visit, do you want to continue?.'
                        } 
                        button={alertConfirmPending ? 'Mark as Pending' : alertConfirmVisited ? 'Mark as Visited' : 'Delete'} // Texto del botón según la acción
                        typeButton={alertConfirmPending || alertConfirmVisited ? 'warning' : 'danger'} // Tipo de botón según la acción
                        buttonCancel={"Cancel"} // Texto del botón de cancelar
                        selection={alertConfirmPending} //Vista solo para pendiente
                        stateChangeSelection={setSelectedEmployee} //Cambios solo para pendiente
                        functionButtonCancel={() => {
                            alertConfirmPending // Función para cerrar la alerta de confirmación
                            ? setAlertConfirmPending(false)
                            : alertConfirmVisited 
                                ? setAlertConfirmVisited(false) 
                                : setAlertConfirmDelete(false);
                        }}
                        functionButton={() => {
                            alertConfirmPending // Función para ejecutar la acción según la alerta
                            ? handleChangePending() // Marca como Pendiente
                            : alertConfirmVisited   
                                ? handleChangeVisited() // Marca como visitado
                                : handleDeleteVisit() // Elimina la visita 
                        }} 
                    />
                )
            }

            {
                (alertPending || alertDelete || alertVisited) && ( // Verifica si hay alertas activas de visita o eliminación
                    <div style={{
                        width: "100%",
                        position: "fixed",
                        top: 0,
                        left: 0, 
                        display: "flex", 
                        justifyContent: "center",
                        margin: "10px 0",
                        zIndex: 9999
                    }}>
                        <Alert variant='success'> {/* Alerta de éxito */}
                            {
                                alertPending 
                                ? "It has been marked as visited and moved to the 'Pending' table." // Mensaje si se ha marcado como pendiente
                                : alertPending 
                                    ? "It has been marked as visited and moved to the 'Visited' table." // Mensaje si se ha marcado como visitado
                                    : "The visit has been removed from the database." // Mensaje si se ha eliminado la visita
                            }
                        </Alert>
                    </div>
                )
            }
        </>
    )
}