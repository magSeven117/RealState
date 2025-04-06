import { useState } from "react";
import React from 'react';

export function BestDeal() {
    // Estado para controlar cuál tipo de propiedad se muestra
    const [showBest, getShowBest] = useState({
        appartment: true,
        villa: false,
        penthouse: false
    });

    // Función para manejar el cambio de tipo de propiedad visible
    const handleChangeShowBest = (type) => {
        const updateShowBest = { appartment: false, villa: false, penthouse: false };
        updateShowBest[type] = true; // Actualiza el estado para mostrar la propiedad seleccionada
        getShowBest(updateShowBest);
    }

    return (
        <div className="section best-deal">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4">
                        <div className="section-heading">
                            <h6>| Mejor Oferta</h6>
                            <h2>¡Encuentra tu mejor oferta ahora mismo!</h2>
                        </div>
                    </div>

                    <div className="col-lg-12">
                        <div className="tabs-content">
                            <div className="row">
                                <div className="nav-wrapper">
                                    <ul className="nav nav-tabs" role="tablist">
                                        <li className="nav-item" role="presentation">
                                            <button
                                                className={`nav-link ${showBest["appartment"] && 'active'}`}
                                                id="appartment-tab"
                                                data-bs-toggle="tab"
                                                data-bs-target="#appartment"
                                                type="button"
                                                role="tab"
                                                aria-controls="appartment"
                                                aria-selected={showBest["appartment"]}
                                                onClick={() => handleChangeShowBest("appartment")}
                                            >
                                                Apartamento
                                            </button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button
                                                className={`nav-link ${showBest["villa"] && 'active'}`}
                                                id="villa-tab"
                                                data-bs-toggle="tab"
                                                data-bs-target="#villa"
                                                type="button"
                                                role="tab"
                                                aria-controls="villa"
                                                aria-selected={showBest["villa"]}
                                                onClick={() => handleChangeShowBest("villa")}
                                            >
                                                Casa tipo Villa
                                            </button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button
                                                className={`nav-link ${showBest["penthouse"] && 'active'}`}
                                                id="penthouse-tab"
                                                data-bs-toggle="tab"
                                                data-bs-target="#penthouse"
                                                type="button"
                                                role="tab"
                                                aria-controls="penthouse"
                                                aria-selected={showBest["penthouse"]}
                                                onClick={() => handleChangeShowBest("penthouse")}
                                            >
                                                Penthouse
                                            </button>
                                        </li>
                                    </ul>
                                </div>

                                <div className="tab-content" id="myTabContent">
                                    <div
                                        className={`tab-pane fade ${showBest["appartment"] && 'show active'}`}
                                        id="appartment"
                                        role="tabpanel"
                                        aria-labelledby="appartment-tab"
                                    >
                                        <div className="row">
                                            <div className="col-lg-3">
                                                <div className="info-table">
                                                    <ul>
                                                        <li>Espacio total <span>185 m2</span></li>
                                                        <li>Número de piso <span>26°</span></li>
                                                        <li>Número de habitaciones <span>4</span></li>
                                                        <li>Parqueadero disponible <span>Sí</span></li>
                                                        <li>Proceso de pago <span>Banco</span></li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <img src='images/deal-01.webp' alt="Oferta Apartamento" />
                                            </div>
                                            <div className="col-lg-3">
                                                <h4>Información extra sobre la propiedad</h4>
                                                <p>
                                                    Invierte en tu futuro con este moderno apartamento disponible por planos. Diseñado para ofrecer comodidad y elegancia, cuenta con amplios espacios, iluminación natural y una vista inigualable desde el piso 26.
                                                    <br /><br />
                                                    Es ideal para familias que buscan tranquilidad y acceso a zonas comunes como gimnasio, piscina y zonas verdes. ¡Aprovecha el precio de lanzamiento!
                                                </p>
                                                <div className="icon-button">
                                                    <a href="/properties">
                                                        <i className="fa fa-calendar"></i> Agendar una visita
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div
                                        className={`tab-pane fade ${showBest["villa"] && 'show active'}`}
                                        id="villa"
                                        role="tabpanel"
                                        aria-labelledby="villa-tab"
                                    >
                                        <div className="row">
                                            <div className="col-lg-3">
                                                <div className="info-table">
                                                    <ul>
                                                        <li>Espacio total <span>250 m2</span></li>
                                                        <li>Número de piso <span>26°</span></li>
                                                        <li>Número de habitaciones <span>5</span></li>
                                                        <li>Parqueadero disponible <span>Sí</span></li>
                                                        <li>Proceso de pago <span>Banco</span></li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <img src='images/deal-02.webp' alt="Oferta Villa" />
                                            </div>
                                            <div className="col-lg-3">
                                                <h4>Información detallada sobre la villa</h4>
                                                <p>
                                                    Esta espectacular villa, disponible por planos, combina lujo y funcionalidad en un entorno natural. Sus generosos espacios interiores, acabados premium y diseño contemporáneo la convierten en una inversión exclusiva.
                                                    <br /><br />
                                                    Disfruta de jardines privados, zona BBQ, y acceso a un club residencial. Ideal para quienes buscan privacidad y confort en una zona de alta valorización.
                                                </p>
                                                <div className="icon-button">
                                                    <a href="/properties">
                                                        <i className="fa fa-calendar"></i> Agendar una visita
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div
                                        className={`tab-pane fade ${showBest["penthouse"] && 'show active'}`}
                                        id="penthouse"
                                        role="tabpanel"
                                        aria-labelledby="penthouse-tab"
                                    >
                                        <div className="row">
                                            <div className="col-lg-3">
                                                <div className="info-table">
                                                    <ul>
                                                        <li>Espacio total <span>320 m2</span></li>
                                                        <li>Número de piso <span>34°</span></li>
                                                        <li>Número de habitaciones <span>6</span></li>
                                                        <li>Parqueadero disponible <span>Sí</span></li>
                                                        <li>Proceso de pago <span>Banco</span></li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <img src='images/deal-03.webp' alt="Oferta Penthouse" />
                                            </div>
                                            <div className="col-lg-3">
                                                <h4>Información extra sobre el penthouse</h4>
                                                <p>
                                                    Vive por todo lo alto en este exclusivo penthouse disponible por planos. Con acabados de lujo, ventanales de piso a techo y una vista panorámica de la ciudad, es el epítome del estilo de vida sofisticado.
                                                    <br /><br />
                                                    Espacios amplios, terraza privada y acceso directo desde el ascensor hacen de esta propiedad una verdadera joya para inversionistas y compradores exigentes.
                                                </p>
                                                <div className="icon-button">
                                                    <a href="/properties">
                                                        <i className="fa fa-calendar"></i> Agendar una visita
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}