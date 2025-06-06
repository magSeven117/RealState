import { useEffect, useState } from "react";
// import { useLocation, useParams } from 'react-router-dom';
import { Link, usePage } from '@inertiajs/react';
import React from 'react';
import { LinkVisit } from "@/Components/features/LinkVisit";

export function Header() {
    const [showMenu, getShowMenu] = useState(true); // Estado para controlar la visibilidad del menú
    const location = usePage(); // Obtiene la ubicación actual

    const handleScroll = () => {
        // Asegurarse de que el elemento existe antes de aplicar estilo
        const menuElement = document.getElementsByClassName("menu")[0];
        if (window.scrollY == 0) {
            menuElement.style.top = ""; // Restablecer posición si no se ha desplazado
            menuElement.style.position = "absolute"; // Menú en posición absoluta
        } else {
            menuElement.style.top = "0"; // Fijar menú en la parte superior
            menuElement.style.position = "fixed"; // Menú en posición fija
        }
    }

    const handleClick = () => {
        // Alternar la visibilidad del menú en pantallas pequeñas
        if (window.innerWidth <= 768) getShowMenu(!showMenu);
    }

    useEffect(() => {
        handleScroll(); // Aplicar estilo inicial al menú

        window.addEventListener("scroll", handleScroll); // Agregar evento de desplazamiento

        // Configurar visibilidad del menú en función del tamaño de la pantalla
        if (window.innerWidth <= 765)
            getShowMenu(false);
        else
            getShowMenu(true);

        window.addEventListener('resize', () => { // Evento para manejar el cambio de tamaño
            if (window.innerWidth <= 765)
                getShowMenu(false);
            else
                getShowMenu(true);
        });

        return () => {
            window.removeEventListener("scroll", handleScroll); // Limpiar evento al desmontar
        };
    }, []);

    return (
        <>
            <div className="sub-header">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-md-8">
                            <ul className="info">
                                <li><i className="fa fa-envelope"></i> info@empresa.com</li>
                                <li><i className="fa fa-map"></i> Sunny Isles Beach, FL 33160</li>
                            </ul>
                        </div>
                        <div className="col-lg-4 col-md-4">
                            <ul className="social-links">
                                <li><a href="#"><i className="fab fa-facebook"></i></a></li>
                                <li><a href="https://x.com/minthu" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a></li>
                                <li><a href="#"><i className="fab fa-linkedin"></i></a></li>
                                <li><a href="#"><i className="fab fa-instagram"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <header className="header-area header-sticky menu" style={{ width: "100%", height: "100px" }}>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <nav className="main-nav">
                                {/* ***** Logo Inicio ***** */}
                                <Link href='/' className="logo">
                                    <img src="/images/logo.png" alt="logo" style={{ width: "90px", padding: "5px" }} />
                                </Link>
                                {/* ***** Logo Fin ***** */}
                                {/* ***** Menú Inicio ***** */}
                                <ul className={`nav ${showMenu ? 'show-nav' : 'no-show-nav'}`}>
                                    <li>
                                        <Link href="/" className={`${location.url == '/' && 'active'}`}>Inicio</Link>
                                    </li>
                                    <li>
                                        <Link href="/properties" className={`${location.url == '/properties' && 'active'}`}>Propiedades</Link>
                                    </li>
                                    <li>
                                        <Link href="/about" className={`${location.url == '/about' && 'active'}`}>¿Quiénes Somos?</Link>
                                    </li>
                                    <li>
                                        <Link href="/contact" className={`${location.url == '/contact' && 'active'}`}>Contáctanos</Link>
                                    </li>
                                    <li>
                                        {
                                            location.url.includes('/propertie/')
                                                ? <LinkVisit />// Muestra el enlace a la visita si hay un ID
                                                : null
                                        }
                                    </li>
                                    <Link
                                        href="/login"
                                        style={{
                                            backgroundColor: "#f35525",
                                            color: "#fff",
                                            padding: "6px 20px",
                                            borderRadius: "6px",
                                            fontWeight: "600",
                                            fontSize: "14px",
                                            textDecoration: "none",
                                            display: "inline-flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            height: "36px",
                                            lineHeight: "1"
                                        }}
                                    >
                                        Iniciar Sesión
                                    </Link>


                                </ul>
                                <a onClick={handleClick} className={`menu-trigger ${showMenu ? 'active' : ''}`}>
                                    <span>Menú</span>
                                </a>
                                {/* ***** Menú Fin ***** */}
                            </nav>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}