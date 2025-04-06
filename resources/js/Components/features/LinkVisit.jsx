import React from "react";
import { Link, usePage } from '@inertiajs/react' // Importa Link para la navegación

export function LinkVisit() {
    const location = usePage();
    const id = location.props.data.id;

    return (
        // Crea un enlace que redirige a la página de programación de visitas
        <Link href={`/visit/${id}`} className="visit">
            <i className="fa fa-calendar"></i> {/* Icono de calendario */}
            Programar una visita {/* Texto del enlace */}
        </Link>
    );
}
