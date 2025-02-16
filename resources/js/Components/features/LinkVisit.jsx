import React from "react";
import { Link } from '@inertiajs/react' // Importa Link para la navegación

export function LinkVisit({ id }) {
    return (
        // Crea un enlace que redirige a la página de programación de visitas
        <Link to={`/visit/${id}`} className="visit">
            <i className="fa fa-calendar"></i> {/* Icono de calendario */}
            Schedule a visit {/* Texto del enlace */}
        </Link>
    );
}
