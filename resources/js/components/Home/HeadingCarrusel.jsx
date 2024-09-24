import { Carousel } from 'react-bootstrap'; // Importa el componente Carousel de React Bootstrap
import { banner01, banner02, banner03 } from '../ImageAssets'; // Importa las imágenes del carrusel
import React from 'react'; // Importa React

// Componente HeadingCarrusel que renderiza un carrusel de imágenes
export function HeadingCarrusel () {
    return (
        <Carousel style={{height: "100%", marginTop: "100px"}}> {/* Estilos del carrusel */}
            {/* Primer item del carrusel */}
            <Carousel.Item style={{height: "100%"}} className='responsive-banner'>
                <div className="position-relative" style={{height: "100%"}}> {/* Contenedor para la imagen y el texto */}
                    <img
                        className="d-block w-100" // Clases de Bootstrap para imagen
                        src={banner01} // Imagen a mostrar
                        alt="Toronto, Canada" // Texto alternativo para la imagen
                    />
                    {/* Contenedor para el texto superpuesto */}
                    <div className="position-absolute left-0 top-0 z-20 w-100 h-100 text-home" style={{ padding: '8% 20%'}}>
                        <p 
                            className="bg-white" // Clase de fondo blanco
                            style={{
                                color: "#1e1e1e", // Color del texto
                                fontSize: "20px", // Tamaño de fuente
                                fontWeight: "500", // Grosor de fuente
                                textTransform: "capitalize", // Capitaliza el texto
                                padding: "6px 15px", // Espaciado interno
                                display: "inline-block", // Muestra como bloque en línea
                                marginBottom: "30px" // Margen inferior
                            }}
                        >
                            Toronto, <em style={{fontStyle: "normal", color: "#f35525"}}>Canada</em> {/* Texto de ubicación */}
                        </p>

                        <h3 
                            className="text-white mb-0" // Clases para estilo
                            style={{
                                fontSize: "80px", // Tamaño de fuente
                                textTransform: "uppercase", // Convierte a mayúsculas
                                lineHeight: "72px", // Altura de línea
                                width: "50%", // Ancho del contenedor
                                fontWeight: "700" // Grosor de fuente
                            }}
                        >
                            Hurry! <br /> Get the Best Villa for you {/* Título principal */}
                        </h3>
                    </div>
                </div>
            </Carousel.Item>

            {/* Segundo item del carrusel */}
            <Carousel.Item style={{height: "100%"}} className='responsive-banner'>
                <div className="position-relative" style={{height: "100%"}}>
                    <img
                        className="d-block w-100"
                        src={banner02} // Imagen a mostrar
                        alt="Melbourne, Australia" // Texto alternativo para la imagen
                    />
                    <div className="position-absolute left-0 top-0 z-20 w-100 h-100 text-home" style={{ padding: '8% 20%'}}>
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
                            Melbourne, <em style={{fontStyle: "normal", color: "#f35525"}}>Australia</em>
                        </p>

                        <h3 
                            className="text-white mb-0"
                            style={{
                                fontSize: "80px",
                                textTransform: "uppercase",
                                lineHeight: "72px",
                                width: "50%",
                                fontWeight: "700"
                            }}
                        >
                            Be Quick!<br />Get the best villa in town {/* Título principal */}
                        </h3>
                    </div>
                </div>
            </Carousel.Item>

            {/* Tercer item del carrusel */}
            <Carousel.Item style={{height: "100%"}} className='responsive-banner'>
                <div className="position-relative" style={{height: "100%"}}>
                    <img
                        className="d-block w-100"
                        src={banner03} // Imagen a mostrar
                        alt="Miami, South Florida" // Texto alternativo para la imagen
                    />
                    <div className="position-absolute left-0 top-0 z-20 w-100 h-100 text-home" style={{ padding: '8% 20%'}}>
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
                            Miami, <em style={{fontStyle: "normal", color: "#f35525"}}>South Florida</em>
                        </p>

                        <h3 
                            className="text-white mb-0"
                            style={{
                                fontSize: "80px",
                                textTransform: "uppercase",
                                lineHeight: "72px",
                                width: "50%",
                                fontWeight: "700"
                            }}
                        >
                            Act now!<br />Get the best of penthouses {/* Título principal */}
                        </h3>
                    </div>
                </div>
            </Carousel.Item>
        </Carousel>
    );
}
