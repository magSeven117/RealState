import { createContext, useEffect, useState } from "react";
import React from 'react';

// Crea un contexto para las casas
export const HouseContext = createContext();

// Proveedor del contexto de casas
export function HouseProvider({ children }) {
    // Estado para almacenar la lista de casas
    const [houses, setHouses] = useState([]);
    // Estado para almacenar las características de las casas
    const [feature, setFeature] = useState([]);
    // Estado para almacenar los tipos de casas
    const [typeHouse, setTypeHouse] = useState([]);
    // Estado para almacenar la URL de la API
    const [urlAPI, setUrlAPI] = useState("");

    // Efecto para obtener datos de la API cuando cambia `urlAPI`
    useEffect(() => {
        if(urlAPI){
            // Obtener datos de casas desde la API
            fetch("http://192.168.1.117:8000"+urlAPI)
                .then(res => res.json()) // Convierte la respuesta a JSON
                .then(res => setHouses(res)) // Actualiza el estado de las casas
                .catch(() => {
                    setHouses({ status: 400 }); // Manejo de errores, establece el estado de casas en error
                });
        }
    }, [urlAPI]); // Dependencia del efecto: `urlAPI`, se ejecutará cada vez que `urlAPI` cambie

    useEffect(()=>{
        // Definir la URL para obtener características y tipos de casas
        const url_2 = "/api/features";

        // Obtener datos de características y tipos de casas desde la API
        fetch("http://192.168.1.117:8000"+url_2)
            .then(res => res.json()) // Convierte la respuesta a JSON
            .then(res => {
                setFeature(res.data.Feature); // Actualiza el estado de características
                setTypeHouse(res.data.TypeHouse); // Actualiza el estado de tipos de casas
            })
            .catch(() => {
                setFeature({ status: 400 }); // Manejo de errores, establece el estado de características en error
                setTypeHouse({ status: 400 }); // Manejo de errores, establece el estado de tipos de casas en error
            });
    }, [])
    
    return (
        // Proveedor del contexto de casas
        // Proporciona el estado de casas, características, tipos de casas, y las funciones para actualizar estos estados
        <HouseContext.Provider value={{ houses, feature, typeHouse, setHouses, setUrlAPI, urlAPI }}>
            {children} {/* Renderiza los componentes hijos que consumen este contexto */}
        </HouseContext.Provider>
    );
}
