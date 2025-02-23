import React from "react";
import { Link, router } from "@inertiajs/react";


export function ModalNotify({ notification }) {
    
    const handleMarkAsRead = (id) =>{
        router.post('/notification/'+id)
    }
    console.log(notification);
    
    return (
        <div className="content-notify"> 
            {/* Título de la sección de notificaciones */}
            <div>
                <h5 style={{ width:"100%", textAlign:"center" }}>Notifications</h5>
            </div>
            {   notification && notification.length > 0
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
                                            <Link href={'/property/' + item.data.visit.house_id} target="_blank">View house</Link>    
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

                :<div style={{ width:"100%" }}>
                    {/* Mensaje cuando no hay notificaciones disponibles */}
                    <p style={{ width:"100%", textAlign:"center", color:"#565656" }}>No notifications available.</p>
                </div>
            }
        
        </div>
    );
}