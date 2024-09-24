import { Form } from "../General/Form";
import { InfoContact } from "../General/InfoContact";
import { Map } from "../General/Map";
import React from 'react';

export function RenderContact() {
    return (
        <>
            {/* ***** Contact Section Start ***** */}
            <div className="contact section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 offset-lg-4">
                            <div className="section-heading text-center">
                                <h6>| Contact Us</h6>
                                <h2>Get In Touch With Our Agents</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* ***** Contact Section End ***** */}

            {/* ***** Contact Map Start ***** */}
            <div className="contact-content">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-7">
                            <Map /> {/* Componente que muestra el mapa */}
                            <InfoContact /> {/* Componente con información de contacto */}
                        </div>
                        <div className="col-lg-5">
                            <Form /> {/* Componente del formulario de contacto */}
                        </div>
                    </div>
                </div>
            </div>
            {/* ***** Contact Map End ***** */}
        </>
    );
}
