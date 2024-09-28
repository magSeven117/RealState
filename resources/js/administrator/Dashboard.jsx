import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { HeaderAdministrator } from "../components/Administrator/Header";
import { Button, Spinner, Table } from "react-bootstrap";
import '../assets/css/admin.css';
import { ModalNotify } from "../components/Administrator/ModalNotify";
import { ModalGraphicEmployeeVisit } from "../components/Administrator/ModalGraphicEmployeeVisit";
import { ModalTablePropertiesCreated } from "../components/Administrator/ModalTablePropertiesCreated";
import { ModalGraphic } from "../components/Administrator/ModalGraphic";

export function Dashboard({  }) {
    const {user, loginSuccessful} = useContext(AuthContext);

    return (
        <>
            {
                loginSuccessful    
                ?<>
                    <HeaderAdministrator />
                    <div className="container-all">
                        <ModalNotify />
                        <div className="container-right">
                            {/* Graficas de visitas y visualizaciones */}
                            <ModalGraphic />

                            {/* Tabla de ultimas propiedades agregadas */}
                            <ModalTablePropertiesCreated />

                            {/* Tablas de empleados y visitas urgentes */}
                            <ModalGraphicEmployeeVisit />
                        </div>
                    </div>
                    
                </>

                :<div style={{ height:"100vh", width:"100%", display:"flex", justifyContent:"center", alignItems:"center" }}>
                    <Spinner animation="border" />
                </div>
                
            }
        </>
    )
}