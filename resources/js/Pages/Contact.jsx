import { Form } from "@/Components/forms/Form"
import { Footer } from "@/Components/layout/Footer"
import { Heading } from "@/Components/layout/Heading"
import { Header } from "@/Components/layout/Nav"
import { InfoContact } from "@/Components/misc/InfoContact"
import { Map } from "@/Components/misc/Map"
import { Head } from "@inertiajs/react"
import React from "react"

export default function Contact() {
    return (
        <>
            <Head title="Contacto" />
            {/* ***** Inicio del Área de Encabezado ***** */}
            <Header />
            {/* ***** Fin del Área de Encabezado ***** */}

            {/* ***** Inicio del Título ***** */}
            <Heading title="Contacto" />
            {/* ***** Fin del Título ***** */}

            {/* ***** Inicio de la Sección Principal ***** */}
            <div className="contact-page section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="section-heading">
                                <h6>| Contáctanos</h6>
                                <h2>Ponte en contacto con nuestros agentes</h2>
                            </div>
                            <p>
                                Si estás buscando desarrollar un proyecto desde sus planos, nuestro equipo de expertos está listo para asesorarte en cada etapa del proceso. Contamos con una amplia experiencia en diseño arquitectónico y planificación de espacios.
                                <br /><br />
                                No dudes en ponerte en contacto con nosotros para obtener más información sobre cómo podemos ayudarte a hacer realidad tu proyecto con soluciones innovadoras y eficientes.
                            </p>

                            <InfoContact wrap={true} />
                        </div>

                        <div className="col-lg-6">
                            <Form />
                        </div>

                        <div className="col-lg-12">
                            <Map />
                        </div>
                    </div>
                </div>
            </div>
            {/* ***** Fin de la Sección Principal ***** */}

            {/* ***** Inicio de la Sección de Propiedades ***** */}
            <Footer />
            {/* ***** Fin de la Sección de Propiedades ***** */}
        </>
    )
}
