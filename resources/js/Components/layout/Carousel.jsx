import { Carousel } from 'react-bootstrap';
import React from 'react';

export function HeadingCarrusel () {
    return (
        <Carousel style={{height: "100%", marginTop: "100px"}}>
            <Carousel.Item style={{height: "100%"}} className='responsive-banner'>
                <div className="position-relative" style={{height: "100%"}}>
                    <img
                        className="d-block w-100"
                        src='/images/banner-01.jpg'
                        alt="Proyecto en Bogotá"
                    />
                    <div className="top-0 left-0 z-0 position-absolute w-100 h-100 text-home" style={{ padding: '8% 20%'}}>
                        <p 
                            className="bg-white"
                            style={{
                                color: "#1e1e1e",
                                fontSize: "20px",
                                fontWeight: "500",
                                textTransform: "capitalize",
                                padding: "6px 15px",
                                display: "inline-block",
                                marginBottom: "30px"
                            }}
                        >
                            Bogotá, <em style={{fontStyle: "normal", color: "#f35525"}}>Colombia</em>
                        </p>

                        <h3 
                            className="mb-0 text-white"
                            style={{
                                fontSize: "80px",
                                textTransform: "uppercase",
                                lineHeight: "72px",
                                width: "50%",
                                fontWeight: "700"
                            }}
                        >
                            ¡Invierte hoy! <br /> Proyectos sobre planos exclusivos
                        </h3>
                    </div>
                </div>
            </Carousel.Item>

            <Carousel.Item style={{height: "100%"}} className='responsive-banner'>
                <div className="position-relative" style={{height: "100%"}}>
                    <img
                        className="d-block w-100"
                        src='/images/banner-02.webp'
                        alt="Proyecto en Medellín"
                    />
                    <div className="top-0 left-0 z-0 position-absolute w-100 h-100 text-home" style={{ padding: '8% 20%'}}>
                        <p 
                            className="bg-white"
                            style={{
                                color: "#1e1e1e",
                                fontSize: "20px",
                                fontWeight: "500",
                                textTransform: "capitalize",
                                padding: "6px 15px",
                                display: "inline-block",
                                marginBottom: "30px"
                            }}
                        >
                            Medellín, <em style={{fontStyle: "normal", color: "#f35525"}}>Colombia</em>
                        </p>

                        <h3 
                            className="mb-0 text-white"
                            style={{
                                fontSize: "80px",
                                textTransform: "uppercase",
                                lineHeight: "72px",
                                width: "50%",
                                fontWeight: "700"
                            }}
                        >
                            ¡No esperes más!<br /> Invierte en el futuro de la ciudad
                        </h3>
                    </div>
                </div>
            </Carousel.Item>

            <Carousel.Item style={{height: "100%"}} className='responsive-banner'>
                <div className="position-relative" style={{height: "100%"}}>
                    <img
                        className="d-block w-100"
                        src='/images/banner-03.webp'
                        alt="Proyecto en Cali"
                    />
                    <div className="top-0 left-0 z-0 position-absolute w-100 h-100 text-home" style={{ padding: '8% 20%'}}>
                        <p 
                            className="bg-white"
                            style={{
                                color: "#1e1e1e",
                                fontSize: "20px",
                                fontWeight: "500",
                                textTransform: "capitalize",
                                padding: "6px 15px",
                                display: "inline-block",
                                marginBottom: "30px"
                            }}
                        >
                            Cali, <em style={{fontStyle: "normal", color: "#f35525"}}>Colombia</em>
                        </p>

                        <h3 
                            className="mb-0 text-white"
                            style={{
                                fontSize: "80px",
                                textTransform: "uppercase",
                                lineHeight: "72px",
                                width: "50%",
                                fontWeight: "700"
                            }}
                        >
                            ¡Sé parte del cambio!<br /> Compra en planos con alta valorización
                        </h3>
                    </div>
                </div>
            </Carousel.Item>
        </Carousel>
    );
}
