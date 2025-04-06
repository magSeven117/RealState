import { Footer } from "@/Components/layout/Footer";
import { Heading } from "@/Components/layout/Heading";
import { Header } from "@/Components/layout/Nav";
import { Head } from "@inertiajs/react";
import React from "react";

export default function About() {
    return (
        <>
            <Head title="Sobre Nosotros" />
            {/* ***** Inicio del Área de Encabezado ***** */}
            <Header />
            {/* ***** Fin del Área de Encabezado ***** */}

            {/* ***** Inicio del Título ***** */}
            <Heading title="Sobre Nosotros" />
            {/* ***** Fin del Título ***** */}

            {/* ***** Inicio de la Sección Principal ***** */}
            <div className="about-page section">
                <div className="container">
                    {/* ***** Inicio de la Sección de Introducción ***** */}
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="section-heading">
                                <h6>| Quiénes Somos</h6>
                                <h2>Conectamos sueños con realidades</h2>
                            </div>
                            <p>
                                En [Nombre de tu Empresa], nos especializamos en la venta de propiedades sobre planos, ofreciendo a nuestros clientes la oportunidad de invertir en proyectos innovadores y de alta calidad desde su fase inicial. Nuestro compromiso es brindar asesoría integral y acompañamiento durante todo el proceso de compra, asegurando una experiencia transparente y confiable.
                            </p>
                        </div>
                        <div className="col-lg-6">
                            <img src="/images/about-us.jpg" alt="Equipo de [Nombre de tu Empresa]" className="img-fluid" />
                        </div>
                    </div>
                    {/* ***** Fin de la Sección de Introducción ***** */}

                    {/* ***** Inicio de la Sección de Valores ***** */}
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-heading">
                                <h6>| Nuestros Valores</h6>
                                <h2>Principios que nos guían</h2>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="value-box">
                                <h4>Transparencia</h4>
                                <p>Operamos con honestidad y claridad en cada etapa del proceso, asegurando que nuestros clientes estén plenamente informados.</p>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="value-box">
                                <h4>Innovación</h4>
                                <p>Incorporamos las últimas tecnologías y tendencias en el mercado inmobiliario para ofrecer soluciones modernas y eficientes.</p>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="value-box">
                                <h4>Compromiso</h4>
                                <p>Nos dedicamos a cumplir y superar las expectativas de nuestros clientes, brindando un servicio personalizado y de calidad.</p>
                            </div>
                        </div>
                    </div>
                    {/* ***** Fin de la Sección de Valores ***** */}

                    {/* ***** Inicio de la Sección de Servicios ***** */}
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-heading">
                                <h6>| Nuestros Servicios</h6>
                                <h2>¿Qué ofrecemos?</h2>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="service-box">
                                <h4>Asesoría Personalizada</h4>
                                <p>Entendemos las necesidades de cada cliente para ofrecer opciones que se ajusten a sus objetivos y presupuesto.</p>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="service-box">
                                <h4>Proyectos Verificados</h4>
                                <p>Trabajamos únicamente con desarrolladores confiables y proyectos que cumplen con todas las normativas legales y de calidad.</p>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="service-box">
                                <h4>Acompañamiento Integral</h4>
                                <p>Desde la selección del proyecto hasta la entrega de la propiedad, estamos al lado de nuestros clientes en cada paso.</p>
                            </div>
                        </div>
                    </div>
                    {/* ***** Fin de la Sección de Servicios ***** */}

                    {/* ***** Inicio de la Sección de Testimonios ***** */}
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-heading">
                                <h6>| Testimonios</h6>
                                <h2>Lo que dicen nuestros clientes</h2>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="testimonial-box">
                                <p>"Gracias a [Nombre de tu Empresa], encontré el proyecto perfecto para invertir. Su equipo me guió en todo momento y resolvió todas mis dudas."</p>
                                <h5>- Juan Pérez</h5>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="testimonial-box">
                                <p>"La transparencia y profesionalismo de [Nombre de tu Empresa] me dieron la confianza para invertir en una propiedad sobre planos. ¡Altamente recomendados!"</p>
                                <h5>- María Gómez</h5>
                            </div>
                        </div>
                    </div>
                    {/* ***** Fin de la Sección de Testimonios ***** */}
                </div>
            </div>
            {/* ***** Fin de la Sección Principal ***** */}

            {/* ***** Inicio del Área de Pie de Página ***** */}
            <Footer />
            {/* ***** Fin del Área de Pie de Página ***** */}
        </>
    );
}
