import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";


export function ModalNotify() {
    const [ notification, setNotification ] = useState();
    const [ token, setToken ] = useState();
    const [ reload, setReload ] = useState(false);

    useEffect(()=>{
        fetch('/api/notifications?limit=5')
            .then(res=>res.json())
            .then(res=>{
                if(res.status === 200){
                    setNotification(res.data);
                }
            })

        fetch('/api/csrf-token') // Obtener el token CSRF
            .then(res => res.json())
            .then(res => {
                setToken(res.csrf_token); // Almacenar el token en el estado
            });
    }, [reload])

    const handleMarkAsRead = (id)=>{
        // Configurar los encabezados para la solicitud de eliminación
        const headers = new Headers();
        headers.append('X-CSRF-TOKEN', token);
        headers.append('Accept', 'application/json');

        const config = {
            method: 'POST', // Método de la solicitud
            headers: headers, // Encabezados configurados
            mode: "cors", // Modo de la solicitud
            cache: 'no-cache', // Sin caché
        };

        fetch('/api/notifications/'+id, config)
            .then(res=>res.json())
            .then(res=>{
                if(res.status === 200){
                    setReload(!reload);
                }
            })
    };

    return (
        <div className="content-notify"> 
            {/* Solo soporta 5 notificacion */}
            <div>
                <h5 style={{ width:"100%", textAlign:"center" }}>Notifications</h5>
            </div>
            {
                notification 
                ? notification.length != 0 
                    ? notification.map(item=>{
                        return (
                            <div className="card-notify" key={item.id}>
                                <div className="container-notify">
                                    <div className="left-notify">
                                        <div className="status-ind-notify"></div>
                                    </div>
                                    <div className="right-notify">
                                        <div className="text-wrap-notify">
                                            <p className="text-content-notify">
                                                <a className="text-link-notify" href="#">{item.data.visit.name} {item.data.visit.lastname}</a> has scheduled a visit 
                                            </p>
                                            <p className="time-notify">{item.created_at_human}</p>
                                        </div>
                                        <div className="button-wrap-notify">
                                            <button className="primary-cta-notify button-notify">
                                                <Link to={'/dashboard/properties/modify/'+item.data.visit.house_id}>View house</Link>    
                                            </button>
                                            
                                            <button 
                                                className="secondary-cta-notify button-notify"
                                                onClick={()=>{
                                                    handleMarkAsRead(item.id);
                                                }}
                                            >
                                                Mark as read
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                    : <div style={{ width:"100%" }}>
                        <p style={{ width:"100%", textAlign:"center", color:"#565656" }}>No notifications available.</p>
                    </div>

                : <div style={{ display:"flex", height:"100%", width:"100%", alignContent:"center", justifyContent:"center" }}>
                    <Spinner />
                </div>
            }
            
        </div>
    );
}