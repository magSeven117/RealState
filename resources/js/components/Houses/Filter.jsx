import { useContext, useEffect, useState } from "react";
import { HouseContext } from "../../context/houseContext";
import { RenderFilter } from "./RenderFilter";
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export function Filter() {
    // Obtiene el contexto de la casa que proporciona la URL de la API
    const { urlAPI, setUrlAPI } = useContext(HouseContext);
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const navigate = useNavigate();

    // Efecto para actualizar la URL de la API cuando se cambia el query string
    useEffect(() => {
        const url = query.toString();

        if(url){
            setUrlAPI("/api/houses/" + url + "&published=true");
        } else {
            setUrlAPI("/api/houses/?published=true");
        } 
    }, [query]);

    // Maneja el cambio de los filtros y construye la URL de consulta
    const handleChangeFilter = (e) => {
        // Obtiene el valor del filtro de precio mínimo
        const minPrice = parseFloat(document.getElementById('priceMin').value) 
            ? "&minPrice=" + parseFloat(document.getElementById('priceMin').value) 
            : "" ;
        
        // Obtiene el valor del filtro de precio máximo
        const maxPrice = parseFloat(document.getElementById('priceMax').value) 
            ? "&maxPrice=" + parseFloat(document.getElementById('priceMax').value) 
            : "";

        // Obtiene el valor del tamaño mínimo
        const minSize = parseFloat(document.getElementById('sizeMin').value) 
            ? "&minSize=" + parseFloat(document.getElementById('sizeMin').value) 
            : "";

        // Obtiene el valor del tamaño máximo
        const maxSize = parseFloat(document.getElementById('sizeMax').value) 
            ? "&maxSize=" + parseFloat(document.getElementById('sizeMax').value) 
            : "";

        // Obtiene el valor del tipo de casa
        const valueTypeHouse = document.getElementById('typeHouse').value;
        const typeHouse = valueTypeHouse && valueTypeHouse != 0
            ? "&type_house=" + valueTypeHouse 
            : "";

        // Obtiene el valor del número de habitaciones seleccionado
        const room = document.querySelector('input[name="room"]:checked')
            ? "&quarter=" + document.querySelector('input[name="room"]:checked').value.slice(5,6)
            : "";

        // Obtiene el valor del número de baños seleccionado
        const bath = document.querySelector('input[name="bath"]:checked')
            ? "&bathroom=" + document.querySelector('input[name="bath"]:checked').value.slice(5,6)
            : "";

        // Obtiene los valores de las características seleccionadas
        const selectedFeatures = [];
        const featureCheckboxes = document.querySelectorAll('input[name^="feature-"]:checked');

        featureCheckboxes.forEach((checkbox) => {
            selectedFeatures.push(checkbox.dataset.value);
        });

        // Construye el parámetro de características en la URL
        const features = selectedFeatures.length > 0 
        ? "&features=" + selectedFeatures 
        : "";

        // Concatena todos los filtros a la URL base
        const newURL ="?" + minPrice + maxPrice + room + bath + typeHouse + maxSize + minSize + features;
        
        navigate(newURL)
    }

    // Maneja el reinicio de los filtros
    const handleClearFilter = () => {
        let newURL = "http://localhost/api/houses/";
        
        // Restablece los valores de los filtros a sus valores predeterminados
        document.getElementById('priceMin').value = '0';
        document.getElementById('priceMax').value = '0';
        document.getElementById('sizeMin').value = '0';
        document.getElementById('sizeMax').value = '0';
        document.getElementById('typeHouse').value = '0';
        document.getElementById('searchHouse').value = '';

        // Desmarca los radios de habitaciones y baños
        const radios = document.querySelectorAll('input[type="radio"][name="room"], input[type="radio"][name="bath"]');
        radios.forEach(radio => radio.checked = false);

        // Desmarca los checkboxes de características
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => checkbox.checked = false);

        navigate("")

        // Restablece la URL de la API
        setUrlAPI(newURL);
    }

    // Renderiza el componente de filtros y pasa las funciones de manejo de eventos como props
    return (
        <>
            <RenderFilter handleChangeFilter={handleChangeFilter} handleClearFilter={handleClearFilter} query={query} />
        </>
    )
}
