import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import React from "react";
import { Header } from "./components/General/Nav";
import { Footer } from "./components/General/Footer";
import { FormVisit } from "./components/Visit/FormVisit";
import { Previewhouse } from "./components/Houses/Previewhouse";

// URL de la API para obtener los detalles de la propiedad por ID
const URL_API_HOUSE = '/api/houses/?id=';

export function MakeVisit() {
    // Obtiene el parámetro 'id' desde la URL
    const { id } = useParams();
    
    // Estado local para almacenar los detalles de la propiedad
    const [ house, setHouse ] = useState({});

    // Efecto que se ejecuta cuando el componente se monta, 
    // para obtener los detalles de la propiedad desde la API
    useEffect(() => {
        fetch(URL_API_HOUSE + id)  // Llama a la API con el ID de la propiedad
            .then(res => res.json())  // Convierte la respuesta a JSON
            .then(res => {
                setHouse(res.data[0]);  // Almacena los datos de la propiedad en el estado
            });
    }, []);  // El array vacío asegura que este efecto solo se ejecute una vez al montar el componente

    return (
        <>
            {/* Renderiza el componente Header */}
            <Header />

            {/* Muestra una vista previa de la propiedad */}
            <Previewhouse house={house} />

            {/* Muestra el formulario para agendar una visita, pasando los detalles de la propiedad */}
            <FormVisit house={house} />

            {/* Renderiza el componente Footer */}
            <Footer />
        </>
    );
}
