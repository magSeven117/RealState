import { Footer } from '@/Components/layout/Footer';  // Importa el componente Footer
import { Header } from '@/Components/layout/Nav';  // Importa el componente Header
import { Heading } from '@/Components/layout/Heading';  // Importa el componente Heading
import { useState, React } from "react";  // Importa useState para manejar el estado del componente
import { LinkVisit } from '@/Components/features/LinkVisit';  // Importa el componente LinkVisit para mostrar un botón de visita
import { Gallery } from '@/Components/features/Gallery';  // Importa el componente Gallery para mostrar imágenes en carrusel

export default function Propertie({ data }) {
    console.log(data);  // Para verificar la estructura de los datos
    
    const [activeCarousel, setActiveCarousel] = useState(false);  // Estado para controlar si el carrusel de imágenes está activo

    // Función para activar o desactivar el carrusel de imágenes
    const handleActiveCarousel = (value) => {
        setActiveCarousel(value);  // Cambia el estado del carrusel
        if (value) {
            document.body.style.overflow = "hidden";  // Si el carrusel está activo, oculta el scroll de la página
        } else {
            document.body.style.overflow = "";  // Si no, permite el scroll normal
        }
    };

    if (!data) {
        return <div>No se encontró la propiedad.</div>;
    }

    return (
        <>
            {/* ***** Header Area Start ***** */}
            <Header />
            {/* ***** Header Area End ***** */}

            {/* ***** Heading Start ***** */}
            <Heading title="Single Property" />
            {/* ***** Heading End ***** */}

            {/* ***** Content Page Start ***** */}
            <div className="single-property section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            {/* Imagen principal de la propiedad */}
                            <div className="main-image">
                                <img
                                    src={data.images[0]}  // URL de la imagen principal
                                    alt={`house principal`}  // Texto alternativo
                                    className="image-details"  // Clase CSS para los estilos
                                    style={{ cursor: "pointer" }}  // Cambia el cursor a pointer
                                    onClick={() => handleActiveCarousel(true)}  // Activa el carrusel al hacer clic
                                />
                                {/* Botón para ver más imágenes */}
                                <div style={{ marginTop: "10px" }}>
                                    <span style={{ fontWeight: "600", cursor: "pointer" }} onClick={() => handleActiveCarousel(true)}>
                                        View More Images
                                    </span>
                                </div>
                            </div>

                            {/* Renderiza el carrusel de imágenes si está activo */}
                            {activeCarousel && <Gallery house={data} handleActiveCarousel={handleActiveCarousel} />}

                            {/* Información principal de la propiedad */}
                            <div className="main-content">
                                <div className="content-info-price">
                                    <span className="category">
                                        {data.type_house.type_house}  {/* Tipo de casa */}
                                    </span>
                                    <p className="price">${Number(Math.floor(data.price)).toLocaleString("de-DE")}</p>  {/* Precio de la propiedad */}
                                </div>

                                <h4>{data.address}</h4>  {/* Dirección de la propiedad */}

                                {/* Descripción de la propiedad, renderizada de forma segura */}
                                <p dangerouslySetInnerHTML={{ __html: data.description }} />
                            </div>

                            {/* Sección de características de la propiedad */}
                            <div className="accordion" id="accordionExample">
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button" type="button">
                                            Features
                                        </button>
                                    </h2>
                                    <div className="accordion-collapse collapse show">
                                        <div className="accordion-body">
                                            {/* Muestra las características de la propiedad */}
                                            {
                                                data.features.map(item => (
                                                    <p key={item.id} style={{ fontWeight: "600", margin: "0", textTransform: "capitalize" }}>
                                                        &bull; {item.name}
                                                    </p>
                                                ))
                                            }
                                            {/* Más características adicionales */}
                                            <p style={{ fontWeight: "600", margin: "0" }}>
                                                &bull; Flat Space {Math.floor(data.size)}m²
                                            </p>
                                            <p style={{ fontWeight: "600", margin: "0" }}>
                                                &bull; {data.quarters} {data.quarters > 1 ? 'Rooms' : 'Room'}
                                            </p>
                                            <p style={{ fontWeight: "600", margin: "0" }}>
                                                &bull; {data.bathroom} {data.bathroom > 1 ? 'Bathrooms' : 'Bathroom'}
                                            </p>
                                            <p style={{ fontWeight: "600", margin: "0" }}>
                                                &bull; Built in {data.date_construction.split('-')[0]}  {/* Año de construcción */}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Columna derecha con información adicional */}
                        <div className="col-lg-4" style={{ padding: "0 35px" }}>
                            {/* Componente LinkVisit para agendar visitas */}
                            <div style={{ marginBottom: "20px" }}>
                                {query.get('admin_view') ? "" : <LinkVisit id={data.id} />}
                            </div>

                            {/* Tabla con información adicional */}
                            <div className="info-table">
                                <ul style={{ paddingLeft: "0" }}>
                                    <li>
                                        <img src='/public/images/info-icon-01.png' alt="" style={{ width: "50px" }} />
                                        <h4>
                                            {Math.floor(data.size)}m²
                                            <br />
                                            <span>Total Flat Space</span>
                                        </h4>
                                    </li>
                                    <li>
                                        <img src='/public/images/room.png' alt="" style={{ width: "50px" }} />
                                        <h4>
                                            {data.quarters}
                                            <br />
                                            <span>Total {data.quarters > 1 ? 'Rooms' : 'Room'}</span>
                                        </h4>
                                    </li>
                                    <li>
                                        <img src='/public/images/bathroom.png' alt="" style={{ width: "50px" }} />
                                        <h4>
                                            {data.bathroom}
                                            <br />
                                            <span>Total {data.bathroom > 1 ? 'Bathrooms' : 'Bathroom'}</span>
                                        </h4>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* ***** Content Page End ***** */}

            {/* ***** Properties Section Start ***** */}
            <Footer />
            {/* ***** Properties Section End ***** */}
        </>
    );
}
