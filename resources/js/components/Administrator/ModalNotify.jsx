import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";


export function ModalNotify() {
    // Declaración de estados usando useState para manejar notificaciones, token y recarga
    const [ notification, setNotification ] = useState(); // Estado para almacenar las notificaciones
    const [ token, setToken ] = useState(); // Estado para almacenar el token CSRF
    const [ reload, setReload ] = useState(false); // Estado para controlar la recarga de datos

    // useEffect se ejecuta cuando el componente se monta o cuando 'reload' cambia
    useEffect(()=>{
        // Realiza una solicitud para obtener las notificaciones con un límite de 5
        fetch('/api/notifications?limit=5')
            .then(res => res.json()) // Convierte la respuesta en JSON
            .then(res => { console.log(res)
                if(res.status === 200){ // Verifica si la respuesta es exitosa
                    setNotification(res.data); // Almacena las notificaciones en el estado
                }
            });

        // Realiza una solicitud para obtener el token CSRF
        fetch('/api/csrf-token') 
            .then(res => res.json()) // Convierte la respuesta en JSON
            .then(res => {
                setToken(res.csrf_token); // Almacena el token CSRF en el estado
            });
    }, [reload]) // Dependencia: se ejecuta cada vez que cambia 'reload'

    const handleMarkAsRead = (id) => {
        // Configurar los encabezados para la solicitud de marcado como leído
        const headers = new Headers();
        headers.append('X-CSRF-TOKEN', token); // Añade el token CSRF a los encabezados
        headers.append('Accept', 'application/json'); // Especifica que se acepta JSON

        const config = {
            method: 'POST', // Método de la solicitud
            headers: headers, // Encabezados configurados
            mode: "cors", // Modo de la solicitud
            cache: 'no-cache', // Sin caché
        };

        // Realiza la solicitud para marcar la notificación como leída
        fetch('/api/notifications/' + id, config)
            .then(res => res.json()) // Convierte la respuesta en JSON
            .then(res => {
                if(res.status === 200){ // Verifica si la respuesta es exitosa
                    setReload(!reload); // Cambia el estado de 'reload' para forzar una recarga
                }
            });
    };

    return (
        <div className="content-notify"> 
            {/* Título de la sección de notificaciones */}
            <div>
                <h5 style={{ width:"100%", textAlign:"center" }}>Notifications</h5>
            </div>
            {
                notification // Verifica si hay notificaciones
                ? notification.length !== 0 // Si hay notificaciones, verifica si hay al menos una
                    ? notification.map(item => {
                        // Itera sobre cada notificación y renderiza un elemento para cada una
                        return (
                            <div className="card-notify" key={item.id}>
                                <div className="container-notify">
                                    <div className="left-notify">
                                        <div className="status-ind-notify"></div> {/* Indicador de estado (puede ser un ícono) */}
                                    </div>
                                    <div className="right-notify">
                                        <div className="text-wrap-notify">
                                            <p className="text-content-notify">
                                                {/* Enlace a la notificación que muestra el nombre y apellido del visitante */}
                                                <a className="text-link-notify" href="#">
                                                    {item.data.visit.name} {item.data.visit.lastname}
                                                </a> ha programado una visita 
                                            </p>
                                            {/* Muestra el tiempo transcurrido desde la creación de la notificación */}
                                            <p className="time-notify">{item.created_at_human}</p>
                                        </div>
                                        <div className="button-wrap-notify">
                                            {/* Botón para ver la casa asociada a la visita */}
                                            <button className="primary-cta-notify button-notify">
                                                <Link to={'/dashboard/properties/modify/' + item.data.visit.house_id}>View house</Link>    
                                            </button>
                                            
                                            {/* Botón para marcar la notificación como leída */}
                                            <button 
                                                className="secondary-cta-notify button-notify"
                                                onClick={() => {
                                                    handleMarkAsRead(item.id); // Llama a la función para marcar como leída
                                                }}
                                            >
                                                Mark as read
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                    : <div style={{ width:"100%" }}>
                        {/* Mensaje cuando no hay notificaciones disponibles */}
                        <p style={{ width:"100%", textAlign:"center", color:"#565656" }}>No notifications available.</p>
                    </div>
    
                : <div style={{ display:"flex", height:"100%", width:"100%", alignContent:"center", justifyContent:"center" }}>
                    {/* Muestra un spinner mientras se cargan las notificaciones */}
                    <Spinner />
                </div>
            }
            
        </div>
    );
}