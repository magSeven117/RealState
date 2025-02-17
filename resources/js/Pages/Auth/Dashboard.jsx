import React from "react";
import { HeaderAdministrator } from "@/Components/admin/Header";
import { Head } from "@inertiajs/react";
import { ModalNotify } from "@/Components/admin/ModalNotify";
import { ModalGraphicEmployeeVisit } from "@/Components/admin/ModalGraphicEmployeeVisit";
import { ModalTablePropertiesCreated } from "@/Components/admin/ModalTablePropertiesCreated";
import { ModalGraphic } from "@/Components/admin/ModalGraphic";

export default function Dashboard({ visit, house, user }) {

    return (
        <>
            <Head>
                <title>Administer</title>
            </Head>

            <HeaderAdministrator user={user}/>
            <div className="container-all">
                <ModalNotify />
                <div className="container-right">
                    {/* Graficas de visitas y visualizaciones */}
                    <ModalGraphic visit={visit} house={house}/>

                    {/* Tabla de ultimas propiedades agregadas */}
                    <ModalTablePropertiesCreated house={house}/>

                    {/* Tablas de empleados y visitas urgentes */}
                    <ModalGraphicEmployeeVisit />
                </div>
            </div>
        </>
    )
}