import { React, useEffect, useState } from "react";
import { HeaderAdministrator } from "@/Components/admin/Header";
import { Alert, Button, ButtonGroup, Table } from "react-bootstrap";
import { ModalConfirmAlert } from "@/Components/admin/ModalConfirmAlert";
import { Head, Link, router } from "@inertiajs/react";


export default function VisitAdministrator({ auth, visit, users }) {
    const [ visited, setVisited ] = useState(1); // Estado para indicar si se ha visitado.
    const [ alertConfirmPending, setAlertConfirmPending ] = useState(false); // Estado para mostrar alerta de confirmación de pendiente.
    const [ alertConfirmVisited, setAlertConfirmVisited ] = useState(false); // Estado para mostrar alerta de confirmación de visita.\
    const [ alertVisited, setAlertVisited ] = useState(false); // Estado para mostrar alerta de visita.
    const [ alertPending, setAlertPending ] = useState(false); // Estado para mostrar alerta de pendiente.
    const [ alertConfirmDelete, setAlertConfirmDelete ] = useState(false); // Estado para mostrar alerta de confirmación de eliminación.
    const [ alertDelete, setAlertDelete ] = useState(false); // Estado para mostrar alerta de eliminación.
    const [ visit_id, setVisit_id ] = useState(); // Estado para almacenar el ID de la visita.
    let [ data, setData ] = useState(visit.data);
    let [ employee, setEmployee ] = useState(visit.data);

    useEffect(()=>{
        handleData()
    }, [visited])

    // Maneja los cambios de datos.
    const handleData = () => {
        setData(visit.data.filter(item=>{
            if(visited === 1 ){
                return item.pending_visit == 0 && !item.visited_date;
            }
            if(visited === 2 ){
                return item.pending_visit == 1 && !item.visited_date;
            }

            if(visited === 3 ){
                return item.visited_date;
            }

            return null;
        }));
    }
    
    // Maneja el cambio de estado de pendiente.
    const handleChangePending = () => {
        setAlertConfirmPending(false); // Cierra la alerta de confirmación de pendiente.
        setAlertPending(true); // Abre la alerta de confirmación de visita.

        setTimeout(() => {
            setAlertPending(false); // Cierra la alerta de confirmación de visita.
            handleData(); // Recarga los datos
        }, 1500);

        // Realiza la solicitud fetch para marcar la visita como pendiente.
        router.post('/dashboard/visit/pending/' + visit_id + '/' + employee)
    };

    // Maneja el cambio de estado de visitado.
    const handleChangeVisited = () => {
        setAlertConfirmVisited(false); // Cierra la confirmación de visita.
        setAlertDelete(true); // Abre la alerta de confirmación de visita.
        
        setTimeout(() => {
            setAlertDelete(false); // Cierra la alerta de confirmación de visita.
            handleData(); // Recarga los datos
        }, 1500);

        router.post('/dashboard/visit/visited/' + visit_id);
    };

    // Maneja la eliminación de una visita.
    const handleDeleteVisit = () => {
        setAlertConfirmDelete(false); // Cierra la alerta de confirmación de eliminación.
        setAlertVisited(true); // Abre la alerta de confirmación de visita.
        
        setTimeout(() => {
            setAlertVisited(false); // Cierra la alerta de confirmación de visita.
            handleData(); // Recarga los datos
        }, 1500);

        router.post('/dashboard/visit/delete/' + visit_id);
    }

    return(
        <>  
            <Head title="Visit Administrator" />

            <HeaderAdministrator user={auth}/> {/* Muestra el encabezado del administrador */}
           
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
                            data && data.map((item) => ( // Mapea los datos de las visitas para mostrarlos en la tabla
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
                                        <Link href={'/propertie/' + item.id } target="_blank"> {/* Enlace para ver detalles de la casa */}
                                            <Button variant="success" style={{ whiteSpace:"nowrap" }}>View House</Button> {/* Botón para ver la casa */}
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

                <div className="justify-center pagination">
                    {visit.links.map((link, index) => (
                        <Link
                            key={index}
                            href={link.url || "#"}
                            className={`px-3 py-1 mx-1 border font-medium border-2 ${link.active ? "bg-[#1e1e1e] text-white" : "bg-[#fafafa] border-[#1e1e1e] text-[#1e1e1e] hover:bg-[#f35525] transition-all duration-300"}`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            </div>
               

            {
                (alertConfirmPending || alertConfirmDelete || alertConfirmVisited) && ( // Verifica si hay alertas de confirmación activas
                    <ModalConfirmAlert 
                        data = {users}
                        setEmployee={setEmployee}
                        title={alertConfirmPending ? 'You are about to mark this as pending.' : alertConfirmVisited ? 'You are about to mark this as visited.' :'Delete Visit.'} // Título de la alerta según la acción
                        subtitle={alertConfirmPending // Subtítulo de la alerta
                            ? "By marking it as pending, it will be moved to the 'Pending' table. Do you want to continue?" 
                            : alertConfirmVisited 
                                ? "By marking it as visited, it will be moved to the 'Visited' table. Do you want to continue?" 
                                : 'You are about to delete this visit, do you want to continue?.'
                        } 
                        button={alertConfirmPending ? 'Mark as Pending' : alertConfirmVisited ? 'Mark as Visited' : 'Delete'} // Texto del botón según la acción
                        typeButton={alertConfirmPending || alertConfirmVisited ? 'warning' : 'danger'} // Tipo de botón según la acción
                        buttonCancel={"Cancel"} // Texto del botón de cancelar
                        selection={alertConfirmPending} //Vista solo para pendiente
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
                        <Alert variant={alertPending ? 'success' : alertVisited ? 'danger' : 'warning' }> {/* Alerta de éxito */}
                            {
                                alertPending 
                                ? "It has been marked as visited and moved to the 'Pending Visits' table." // Mensaje si se ha marcado como pendiente
                                : alertVisited 
                                    ? "The visit has been removed from the database." // Mensaje si se ha eliminado la visita
                                    : "It has been marked as visited and moved to the 'Mark as Visited' table." // Mensaje si se ha marcado como visitado
                            }
                        </Alert>
                    </div>
                )
            }
        </>
    )
}