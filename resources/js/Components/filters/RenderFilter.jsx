import { CancelButton, FilterButton, TrashIcon } from "../ImageAssets";
import { useContext, useEffect, useState } from "react";
import { HouseContext } from "../../context/houseContext";
import React from 'react';
import { useNavigate } from "react-router-dom";

export function RenderFilter({ handleChangeFilter, handleClearFilter, query }) {
    // Estado para controlar la visibilidad del menú de filtros
    const [showFilter, getShowFilter] = useState(true); // `showFilter` indica si el menú de filtros está visible; `getShowFilter` es la función para actualizar este estado.

    const [searchValue, setSearchValue] = useState(''); // `searchValue` almacena el valor de búsqueda ingresado por el usuario; `setSearchValue` es la función para actualizar este valor.

    // Obtiene las características y tipos de casas del contexto utilizando el contexto `HouseContext`
    const { feature, typeHouse } = useContext(HouseContext);

    let debounceTimeout; // Variable para almacenar el temporizador para la búsqueda con debounce
    const navigate = useNavigate(); // Hook para navegar a diferentes rutas

    // Función para alternar la visibilidad del menú de filtros
    const handleFilter = () => {
        getShowFilter(!showFilter); // Cambia el estado de `showFilter` al valor opuesto
    };

    // Obtiene las características seleccionadas desde los parámetros de consulta
    let featuresChecked = query.get('features')
        ? query.get('features').split(",") // Si hay características en la consulta, las divide en un array
        : []; // Si no hay características, se inicializa como un array vacío

    const handleSearch = (e) => {
        const regex = /^[a-zA-Z0-9 ]+$/; // Expresión regular para permitir solo letras, números y espacios

        if (!regex.test(searchValue)) return; // Si el valor de búsqueda no coincide con la expresión regular, sale de la función

        clearTimeout(debounceTimeout); // Limpia el temporizador de debounce anterior

        if (searchValue.length > 3) { // Solo realiza la búsqueda si el valor tiene más de 3 caracteres
            debounceTimeout = setTimeout(() => { // Establece un nuevo temporizador para la búsqueda
                navigate("?search=" + encodeURIComponent(searchValue)); // Navega a la ruta de búsqueda con el valor codificado
            }, 600); // Espera 600 ms antes de realizar la navegación
        }
    };

    // Hook que se ejecuta al cargar el componente
    useEffect(() => {
        if (query.get('search')) { // Verifica si hay un parámetro de búsqueda en la URL
            setSearchValue(query.get('search')); // Si existe, establece el valor de búsqueda
        } else {
            setSearchValue("") // Si no existe, inicializa el valor de búsqueda como vacío
        }
    }, []); // Se ejecuta solo una vez al montar el componente

    // Hook que se ejecuta cuando cambia el valor de búsqueda
    useEffect(() => {
        if (searchValue.length === 0) { // Si el valor de búsqueda está vacío
            setTimeout(() => {
                const searchParams = new URLSearchParams(window.location.search); // Obtiene los parámetros de búsqueda de la URL
                searchParams.delete('search'); // Elimina solo el parámetro 'search'
                navigate("?" + searchParams.toString()); // Navega a la URL actual sin el parámetro de búsqueda
            }, 500); // Espera 500 ms antes de realizar la navegación
        }
    }, [searchValue]); // Se ejecuta cada vez que cambia `searchValue`


    return (
        <>
            {/* Botón para mostrar el menú de filtros */}
            <div className="properties-filter">
                <div className="container-icon-filter">
                    {/* Filtros */}
                    <div>
                        <button title="filtro" className="filter-button" onClick={handleFilter}>

                            <FilterButton />

                        </button>
                        <span style={{ fontSize: "12px", fontWeight: "500" }}>
                            Filtro
                        </span>
                    </div>

                    {/* Limpiar Filtros */}
                    <div
                        style={{ display: "flex", justifyContent: "space-around", flexDirection: "column", alignItems: "center" }}
                        onClick={() => {
                            handleClearFilter()
                            setSearchValue("")
                        }}>
                        <button className="bin-button">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="#000000"
                                viewBox="0 0 39 7"
                                className="bin-top"
                            >
                                <line strokeWidth="4" stroke="black" y2="5" x2="39" y1="5"></line>
                                <line
                                    strokeWidth="3"
                                    stroke="black"
                                    y2="1.5"
                                    x2="26.0357"
                                    y1="1.5"
                                    x1="12"
                                ></line>
                            </svg>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="#000000"
                                viewBox="0 0 33 39"
                                className="bin-bottom"
                            >
                                <mask fill="white" id="path-1-inside-1_8_19">
                                    <path
                                        d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"
                                    ></path>
                                </mask>
                                <path
                                    mask="url(#path-1-inside-1_8_19)"
                                    fill="rgb(77, 77, 77)"
                                    d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
                                ></path>
                                <path strokeWidth="4" stroke="rgb(77, 77, 77)" d="M12 6L12 29"></path>
                                <path strokeWidth="4" stroke="rgb(77, 77, 77)" d="M21 6V29"></path>
                            </svg>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 89 80"
                                className="garbage"
                            >
                                <path
                                    fill="black"
                                    d="M20.5 10.5L37.5 15.5L42.5 11.5L51.5 12.5L68.75 0L72 11.5L79.5 12.5H88.5L87 22L68.75 31.5L75.5066 25L86 26L87 35.5L77.5 48L70.5 49.5L80 50L77.5 71.5L63.5 58.5L53.5 68.5L65.5 70.5L45.5 73L35.5 79.5L28 67L16 63L12 51.5L0 48L16 25L22.5 17L20.5 10.5Z"
                                ></path>
                            </svg>
                        </button>
                        <span style={{ fontSize: "12px", fontWeight: "500" }}>
                            Limpiar Filtro
                        </span>
                    </div>
                </div>

                {/* Búsqueda */}
                <div className="group-search" >
                    <input
                        placeholder="Buscar Casas"
                        type="text" value={searchValue}
                        className="search__input"
                        id="searchHouse"
                        onChange={(e) => setSearchValue(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSearch();
                            }
                        }}
                    />
                    <button className="search__button" onClick={handleSearch}>
                        <svg
                            viewBox="0 0 16 16"
                            className="bi bi-search"
                            fill="currentColor"
                            height="16"
                            width="16"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"
                            ></path>
                        </svg>
                    </button>
                </div>
            </div>

            {/* Menú de filtros */}
            <div className={`Menu-Filter ${showFilter && 'hidden'}`}>
                <div>
                    {/* Botón para cerrar el menú de filtros */}
                    <CancelButton style={{ width: "25px", position: "absolute", top: "10px", right: "10px", cursor: "pointer", color: "#f35525" }} onClick={handleFilter} />
                </div>

                {/* Formulario de filtros */}
                <form>
                    <h2 style={{ color: "#1e1e1e", textAlign: "center", fontWeight: "bold", fontSize: "22px", textTransform: "uppercase" }}>Filtro de Búsqueda</h2>

                    {/* Filtro de Precio */}
                    <div className="container-form">
                        <label htmlFor="price">Precio</label>
                        <div>
                            <select name="price" id="priceMin" defaultValue={query.get("minPrice") ? query.get("minPrice") : "0"} onChange={handleChangeFilter}>
                                <option value="0" disabled>Precio Mínimo</option>
                                <option value="">Todos</option>
                                <option value="50000">$50.000</option>
                                <option value="70000">$70.000</option>
                                <option value="100000">$100.000</option>
                                <option value="150000">$150.000</option>
                                <option value="200000">$200.000</option>
                                <option value="270000">$270.000</option>
                                <option value="300000">$300.000</option>
                            </select>
                            <select name="price" id="priceMax" defaultValue={query.get("maxPrice") ? query.get("maxPrice") : "0"} onChange={handleChangeFilter}>
                                <option value="0" disabled>Precio Máximo</option>
                                <option value="">Todos</option>
                                <option value="1000000">$1.000.000</option>
                                <option value="700000">$700.000</option>
                                <option value="600000">$600.000</option>
                                <option value="400000">$400.000</option>
                                <option value="300000">$300.000</option>
                                <option value="200000">$200.000</option>
                                <option value="150000">$150.000</option>
                                <option value="100000">$100.000</option>
                            </select>
                        </div>
                    </div>

                    {/* Filtro de Dimensión */}
                    <div className="container-form">
                        <label htmlFor="sizeMin">Dimensión</label>
                        <div>
                            <select name="sizeMin" id="sizeMin" defaultValue={query.get("minSize") ? query.get("minSize") : "0"} onChange={handleChangeFilter}>
                                <option value="0" disabled>Tamaño Mínimo</option>
                                <option value="">Todos</option>
                                <option value="40">40m²</option>
                                <option value="50">50m²</option>
                                <option value="60">60m²</option>
                                <option value="70">70m²</option>
                                <option value="90">90m²</option>
                                <option value="100">100m²</option>
                                <option value="120">120m²</option>
                                <option value="150">150m²</option>
                                <option value="200">200m²</option>
                            </select>
                            <select name="sizeMax" id="sizeMax" defaultValue={query.get("maxSize") ? query.get("maxSize") : ""} onChange={handleChangeFilter}>
                                <option value="" disabled>Tamaño Máximo</option>
                                <option value="">Todos</option>
                                <option value="400">400m²</option>
                                <option value="350">350m²</option>
                                <option value="300">300m²</option>
                                <option value="250">250m²</option>
                                <option value="200">200m²</option>
                                <option value="170">170m²</option>
                                <option value="140">140m²</option>
                                <option value="110">110m²</option>
                                <option value="100">100m²</option>
                            </select>
                        </div>
                    </div>

                    {/* Filtro de Tipo de Casa */}
                    <div className="container-form">
                        <label htmlFor="typeHouse">Tipo de Casa</label>
                        <div>
                            <select name="typeHouse" id="typeHouse" value={query.get("type_house") ? query.get("type_house") : ""} onChange={handleChangeFilter}>
                                <option value="" disabled>Seleccionar Casa</option>
                                <option value="0">Todas</option>

                                {
                                    typeHouse.length > 0 ? typeHouse.map(item => {
                                        return (
                                            <option key={item.id} value={item.type_house}>
                                                {item.type_house}
                                            </option>
                                        )
                                    })
                                        : ""
                                }
                            </select>
                        </div>
                    </div>


                    {/* Filtro de Habitaciones */}
                    <div className="container-form selected-checkbox">
                        <label htmlFor="room">Habitaciones</label>
                        <div>
                            <input type="radio" name="room" id="room1" value="room-1" onChange={handleChangeFilter} checked={query.get("quarter") == 1} />
                            <label htmlFor="room1">1 Habitación</label>
                        </div>
                        <div>
                            <input type="radio" name="room" id="room2" value="room-2" onChange={handleChangeFilter} checked={query.get("quarter") == 2} />
                            <label htmlFor="room2">2 Habitaciones</label>
                        </div>
                        <div>
                            <input type="radio" name="room" id="room3" value="room-3" onChange={handleChangeFilter} checked={query.get("quarter") == 3} />
                            <label htmlFor="room3">3 Habitaciones</label>
                        </div>
                        <div>
                            <input type="radio" name="room" id="room4" value="room-4" onChange={handleChangeFilter} checked={query.get("quarter") == 4} />
                            <label htmlFor="room4">4 o más Habitaciones</label>
                        </div>
                    </div>

                    {/* Filtro de Baños */}
                    <div className="container-form selected-checkbox">
                        <label>Baños</label>
                        <div>
                            <input type="radio" name="bath" id="bath-1" value="bath-1" onChange={handleChangeFilter} checked={query.get("bathroom") == 1} />
                            <label htmlFor="bath-1">1 Baño</label>
                        </div>
                        <div>
                            <input type="radio" name="bath" id="bath-2" value="bath-2" onChange={handleChangeFilter} checked={query.get("bathroom") == 2} />
                            <label htmlFor="bath-2">2 Baños</label>
                        </div>
                        <div>
                            <input type="radio" name="bath" id="bath-3" value="bath-3" onChange={handleChangeFilter} checked={query.get("bathroom") == 3} />
                            <label htmlFor="bath-3">3 o más Baños</label>
                        </div>
                    </div>

                    {/* Filtro de Características */}
                    <div className="container-form selected-checkbox">
                        <label>Características</label>
                        {
                            feature.length > 0 && feature.map((item, index) => {
                                return (
                                    <div key={item.id}>
                                        <input
                                            type="checkbox"
                                            name={`feature-${index}`}
                                            id={`feature-${index}`}
                                            data-value={item.name}
                                            onChange={handleChangeFilter}
                                            checked={featuresChecked.includes(item.name)}
                                        />
                                        <label htmlFor={`feature-${index}`}>{item.name}</label>
                                    </div>
                                )
                            })
                        }
                    </div>
                </form>
            </div>
        </>
    )
}
