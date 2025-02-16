import { Footer } from '@/Components/layout/Footer';  // Importa el componente Footer
import { Header } from '@/Components/layout/Nav';  // Importa el componente Header
import { Heading } from '@/Components/layout/Heading';  // Importa el componente Heading
import { useEffect, useState, React } from "react";  // Importa useEffect y useState para manejar efectos secundarios y el estado del componente
import { bathroom, room, sizeIcon } from "./components/ImageAssets";  // Importa imágenes de assets
import { LinkVisit } from '@/Components/features/LinkVisit';  // Importa el componente LinkVisit para mostrar un botón de visita
import { Gallery } from '@/Components/features/Gallery';  // Importa el componente Gallery para mostrar imágenes en carrusel
import { Spinner } from "react-bootstrap"; // Importa el componente Loader para mostrar una animación de carga

export function PropertiesDetails () {
    const [ activeCarousel , setActiveCarousel ] = useState(false);  // Estado para controlar si el carrusel de imágenes está activo
    const query = new URLSearchParams(location.search);

    // Función para activar o desactivar el carrusel de imágenes
    const handleActiveCarousel = (value) => {
        setActiveCarousel(value);  // Cambia el estado del carrusel
        if (value) {
            document.body.style.overflow = "hidden";  // Si el carrusel está activo, oculta el scroll de la página
        } else {
            document.body.style.overflow = "";  // Si no, permite el scroll normal
        }
    };

    return (
        <>
            {/* ***** Header Area Start ***** */}
                <Header />
            {/* ***** Header Area End ***** */}

            {/* ***** Heading Start ***** */}
                <Heading title="Single Property"/>
            {/* ***** Heading End ***** */}

            {/* ***** Content Page Start ***** */}
        {
            // Verifica si la API respondió correctamente y si la propiedad existe como objeto
            response && typeof house == 'object'
            ? <div className="single-property section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            {/* Imagen principal de la propiedad */}
                            <div className="main-image">
                                <img
                                    src={house.images[0]}  // URL de la imagen principal
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
                            { 
                                activeCarousel && <Gallery house={house} handleActiveCarousel={handleActiveCarousel}/>
                            }

                            {/* Información principal de la propiedad */}
                            <div className="main-content">
                                <div className="content-info-price">
                                    <span className="category">
                                        {house.type_house.type_house}  {/* Tipo de casa */}
                                    </span>
                                    <p className="price">${Number(Math.floor(house.price)).toLocaleString("de-DE")}</p>  {/* Precio de la propiedad */}
                                </div>
                                
                                <h4>{house.address}</h4>  {/* Dirección de la propiedad */}
                                
                                {/* Descripción de la propiedad, renderizada de forma segura */}
                                <p dangerouslySetInnerHTML={{ __html: house.description }} />
                            </div>

                            {/* Sección de características de la propiedad */}
                            <div className="accordion" id="accordionExample">
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button
                                            className="accordion-button"
                                            type="button"
                                        >
                                            Features
                                        </button>
                                    </h2>
                                    <div className="accordion-collapse collapse show">
                                        <div className="accordion-body">
                                            {/* Muestra las características de la propiedad */}
                                            {
                                                house.features.map(item => {
                                                    return (
                                                        <p key={item.id} style={{ fontWeight: "600", margin: "0", textTransform: "capitalize" }}>
                                                            &bull; {item.name}
                                                        </p>
                                                    )
                                                })
                                            }
                                            {/* Más características adicionales */}
                                            <p style={{ fontWeight: "600", margin: "0" }}>
                                                &bull; Flat Space {Math.floor(house.size)}m²
                                            </p>
                                            <p style={{ fontWeight: "600", margin: "0" }}>
                                                &bull; {house.quarters} {house.quarters > 1 ? 'Rooms' : 'Room'}
                                            </p>
                                            <p style={{ fontWeight: "600", margin: "0" }}>
                                                &bull; {house.bathroom} {house.bathroom > 1 ? 'Bathrooms' : 'Bathroom'}
                                            </p>
                                            <p style={{ fontWeight: "600", margin: "0" }}>
                                                &bull; Built in {house.date_construction.split('-')[0]}  {/* Año de construcción */}
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
                                {query.get('admin_view') ? "" : <LinkVisit id={id} />}
                            </div>

                            {/* Tabla con información adicional */}
                            <div className="info-table">
                                <ul style={{ paddingLeft: "0" }}>
                                    <li>
                                        <img src={sizeIcon} alt="" style={{ width: "50px" }} />
                                        <h4>
                                            {Math.floor(house.size)}m²
                                            <br />
                                            <span>Total Flat Space</span>
                                        </h4>
                                    </li>
                                    <li>
                                        <img src={room} alt="" style={{ width: "50px" }} />
                                        <h4>
                                            {house.quarters}
                                            <br />
                                            <span>Total {house.quarters > 1 ? 'Rooms' : 'Room'}</span>
                                        </h4>
                                    </li>
                                    <li>
                                        <img src={bathroom} alt="" style={{ width: "50px" }} />
                                        <h4>
                                            {house.bathroom}
                                            <br />
                                            <span>Total {house.bathroom > 1 ? 'Bathrooms' : 'Bathroom'}</span>
                                        </h4>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            // Si la API aún no ha respondido o hay un error, se muestra el loader
            : <div className="single-property section" style={{ width:"100%", display:'flex', justifyContent:'center' }}>
                <Spinner animation="border" /> {/* Componente Loader que muestra un spinner de carga */}
            </div>
        }
        {/* ***** Content Page End ***** */}


            {/* ***** Properties Section Start ***** */}
                <Footer />
            {/* ***** Properties Section End ***** */}
        </>
    );
}