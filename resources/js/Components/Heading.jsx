import { Link, usePage } from '@inertiajs/react';
import React from 'react';

export function Heading ({title}) {
    return (
        <div className="page-heading header-text" style={{backgroundImage: `url(/images/page-heading-bg.jpg)`, marginTop:"100px"}}> {/* Establece la imagen de fondo */}
            <div className="container">
                <div className="row">
                <div className="col-lg-12">
                    <span className="breadcrumb">
                        <Link href="/">Home</Link> / {title} {/* Enlace a la página de inicio con el título actual */}
                    </span>
                    <h3>{title}</h3> {/* Muestra el título de la página */}
                </div>
                </div>
            </div>
        </div>
    )
}
