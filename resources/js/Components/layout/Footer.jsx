import React from 'react';

export function Footer () {
    return (
        <>
            <footer>
                <div className="container"> {/* Contenedor principal del footer */}
                    <div className="px-1 py-5 w-100"> {/* Columna de contenido */}
                        <p>
                            Compra y venta de proyectos sobre planos. Encuentra la mejor inversión para tu futuro con nosotros.
                            Contáctanos para más información.
                        </p>
                        <p>
                            Síguenos en nuestras redes sociales para conocer las mejores oportunidades:
                            <a href='#' style={{ color:"#f35525", fontWeight:"600", marginLeft: "10px" }}>Facebook</a>
                            <a href='#' style={{ color:"#f35525", fontWeight:"600", marginLeft: "10px" }}>Instagram</a>
                            <a href='#' style={{ color:"#f35525", fontWeight:"600", marginLeft: "10px" }}>LinkedIn</a>
                        </p>
                    </div>
                </div>
            </footer>
        </>
    );
}