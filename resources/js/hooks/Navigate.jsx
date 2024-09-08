import { useState, useEffect, useContext } from "react";
import { HouseContext } from "../context/houseContext"; 
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Función para paginar los datos
// `data` es el array de datos a paginar.
// `itemOffset` es el índice de inicio para la página actual.
// `itemsPerPage` es el número de elementos por página.
// Devuelve un objeto con los elementos actuales y el número total de páginas.
const paginate = (data, itemOffset, itemsPerPage) => {
    const endOffset = itemOffset + itemsPerPage; // Calcula el índice final para la página actual.
    const currentItems = data.slice(itemOffset, endOffset); // Obtiene los elementos de la página actual.
    const pageCount = Math.ceil(data.length / itemsPerPage); // Calcula el número total de páginas.

    return { currentItems, pageCount }; // Devuelve los elementos actuales y el número total de páginas.
};

// Hook personalizado para manejar la paginación
const usePagination = () => {
    const { houses } = useContext(HouseContext); // Obtiene el contexto de las casas desde `HouseContext`.
    const itemsPerPage = 9; // Número de elementos por página.
    const [currentItems, setCurrentItems] = useState([]); // Estado para almacenar los elementos actuales de la página.
    const [pageCount, setPageCount] = useState(0); // Estado para almacenar el número total de páginas.
    const [itemOffset, setItemOffset] = useState(0); // Estado para almacenar el índice de inicio de la página actual.

    // Efecto que se ejecuta cada vez que cambian `itemOffset`, `itemsPerPage` o `houses`.
    useEffect(() => {
        if (houses.status === 200 && houses.data && houses.data.length > 0) {
            const { currentItems, pageCount } = paginate(houses.data, itemOffset, itemsPerPage); // Paginación de los datos.
            setCurrentItems(currentItems); // Actualiza los elementos actuales de la página.
            setPageCount(pageCount); // Actualiza el número total de páginas.
        }
    }, [itemOffset, itemsPerPage, houses]); // Dependencias del efecto: `itemOffset`, `itemsPerPage` y `houses`.

    // Función para manejar el clic en los botones de navegación de la página.
    // `event.selected` es el índice de la página seleccionada.
    const handlePageClick = (event) => {
        const newOffset = (event.selected  * itemsPerPage) % houses.data.length; // Calcula el nuevo índice de inicio para la página.
        setItemOffset(newOffset); // Actualiza el estado `itemOffset` con el nuevo valor.
    };

    // Devuelve los elementos actuales, el número total de páginas y la función para manejar el clic en la página.
    return { currentItems, pageCount, handlePageClick, setItemOffset };
};

export default usePagination; // Exporta el hook personalizado `usePagination` como exportación predeterminada.
