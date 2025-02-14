import React from "react";

// Componente Previewhouse que recibe un objeto house como prop
export function Previewhouse({ house }) {
    return (
        <>
            <div className="previewHouses">
                <div>
                    {/* Muestra la imagen de la casa, verifica si house y house.images existen */}
                    <img src={house && house.images ? house.images[0] : ""} alt="Image House" />
                    
                    <div className="content-info">
                        {/* Muestra el tipo de casa, verifica si house y house.type_house existen */}
                        <h1>
                            {
                                house && house.type_house ? house.type_house.type_house : ""
                            }
                        </h1>
                        {/* Muestra la descripción de la casa */}
                        <span>
                            {house.description}
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
}
