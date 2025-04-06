import { useState } from "react";
import React from 'react';

export function ContenFeature() {
    const [showFeature, setShowFeature] = useState(0); // Estado para controlar qué acordeón mostrar

    const handleChangeFeatures = (num) => {
        setShowFeature(num); // Actualiza el estado al número del acordeón seleccionado
    };

    return (
        <div className="featured section">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4">
                        <div className="left-image">
                            <img src='/images/featured.webp' alt="Destacado" />
                            <a href="property-details.html">
                                <img
                                    src='/images/featured-icon.png' 
                                    alt="Ícono Destacado"
                                    style={{ maxWidth: '60px', padding: '0px' }}
                                    className="max-w-[60px] p-0 absolute top-[24%] left-[28%]"
                                />
                            </a>
                        </div>
                    </div>
                    <div className="col-lg-5">
                        <div className="section-heading">
                            <h6>| Destacado</h6>
                            <h2>Proyecto Inmobiliario en Desarrollo</h2>
                        </div>
                        <div className="accordion" id="accordionExample">
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingOne" onClick={() => { handleChangeFeatures(0); }}>
                                    <button className={`accordion-button ${showFeature === 0 ? '' : 'collapsed'}`}>
                                        ¿Qué incluye el plano del proyecto?
                                    </button>
                                </h2>
                                <div id="collapseOne" className={`accordion-collapse ${showFeature === 0 ? 'show' : 'collapse'}`}>
                                    <div className="accordion-body">
                                        El plano del proyecto incluye la distribución de espacios, áreas comunes, zonificación y accesos. Además, incorpora detalles sobre infraestructura y materiales recomendados.
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingTwo" onClick={() => { handleChangeFeatures(1); }}>
                                    <button className={`accordion-button ${showFeature === 1 ? '' : 'collapsed'}`}>
                                        ¿Cuáles son los beneficios de invertir en este proyecto?
                                    </button>
                                </h2>
                                <div id="collapseTwo" className={`accordion-collapse ${showFeature === 1 ? 'show' : 'collapse'}`}>
                                    <div className="accordion-body">
                                        Este proyecto garantiza alta valorización, excelente ubicación y diseño arquitectónico moderno. Además, cuenta con financiamiento flexible y múltiples opciones de personalización.
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingThree" onClick={() => { handleChangeFeatures(2); }}>
                                    <button className={`accordion-button ${showFeature === 2 ? '' : 'collapsed'}`}>
                                        ¿Cuál es el proceso para adquirir un inmueble en plano?
                                    </button>
                                </h2>
                                <div id="collapseThree" className={`accordion-collapse ${showFeature === 2 ? 'show' : 'collapse'}`}>
                                    <div className="accordion-body">
                                        El proceso inicia con la selección del inmueble, firma de contrato de compra y pago inicial. Posteriormente, se realizan pagos programados hasta la entrega final de la propiedad.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="info-table">
                            <ul>
                                <li>
                                    <img src='/images/info-icon-01.png' alt="Ícono 1" style={{ maxWidth: '52px' }} />
                                    <h4>
                                        250 m2<br />
                                        <span>Área Total del Proyecto</span>
                                    </h4>
                                </li>
                                <li>
                                    <img src='/images/info-icon-02.png' alt="Ícono 2" style={{ maxWidth: '52px' }} />
                                    <h4>
                                        Contrato<br />
                                        <span>Disponibilidad Inmediata</span>
                                    </h4>
                                </li>
                                <li>
                                    <img src='/images/info-icon-03.png' alt="Ícono 3" style={{ maxWidth: '52px' }} />
                                    <h4>
                                        Financiamiento<br />
                                        <span>Planes de Pago Flexibles</span>
                                    </h4>
                                </li>
                                <li>
                                    <img src='/images/info-icon-04.png' alt="Ícono 4" style={{ maxWidth: '52px' }} />
                                    <h4>
                                        Seguridad<br />
                                        <span>Vigilancia 24/7</span>
                                    </h4>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
