import { Link } from '@inertiajs/react'
import React from 'react';

// Componente para mostrar las casas
export function RenderHouses({ currentItems }) {
    
    return (
        <>
            {
                // Itera sobre los elementos actuales (casas) y los muestra
                currentItems.map(item => {
                    // Formatea el precio para que use el formato de números alemanes (con separador de miles)
                    const price = Number(Math.floor(item.price)).toLocaleString("de-DE");

                    return (
                        <div className="col-lg-4 col-md-6 align-self-center mb-30 properties-items adv" key={item.id}>
                            <div className="item">
                                {/* Enlace a los detalles de la propiedad */}
                                <Link href={`/property/${item.id}`}> 
                                    <img src={item.images[0]} alt={item.id} style={{ height:"235px", objectFit:"cover" }}/>
                                </Link>
                                {/* Categoría de la propiedad */}
                                <span className="category">
                                    {item.type_house.name}
                                </span>
                                {/* Precio de la propiedad */}
                                <h6>
                                    ${price}
                                </h6>
                                {/* Dirección de la propiedad */}
                                <h4 style={{height:"75px"}}>
                                    <Link href={`/property/${item.id}`}>
                                        {item.address}
                                    </Link>
                                </h4>
                                {/* Información adicional de la propiedad */}
                                <ul style={{padding:"0px", height:"100px"}}>
                                    <li>
                                        Habitaciones: <span>{item.quarters}</span>
                                    </li>
                                    <li>
                                        Baños: <span>{item.bathroom}</span>
                                    </li>
                                    <li>
                                        Área: <span>{Math.floor(item.size)}m²</span>
                                    </li>
                                    {
                                        // Verifica si alguna característica de la propiedad es 'garage' o 'parking' y muestra el dato correspondiente
                                        item.features.map((feature) => {
                                            if (feature.name === 'parking' && feature.name === 'garage') {
                                                return (<li key={feature.name}>Parqueadero: <span>Disponible</span></li>)
                                            } else if (feature.name === 'garden') {
                                                return (<li key={feature.name}>Jardín: <span>Disponible</span></li>)
                                            }
                                            return null;
                                        })
                                    }
                                </ul>
                                {/* Botón para ver la propiedad */}
                                <div className="main-button">
                                    <Link href={`/property/${item.id}`}>Ver la propiedad</Link>
                                </div>
                            </div>
                        </div>
                    );
                })
            }
        </>
    )
}
