import { CancelButton, FilterButton, TrashIcon } from "../ImageAssets";
import { useContext, useState } from "react";
import { HouseContext } from "../../context/houseContext";
import React from 'react';

export function RenderFilter({ handleChangeFilter, handleClearFilter, query }) {
    // Estado para controlar la visibilidad del menú de filtros
    const [showFilter, getShowFilter] = useState(true);

    // Obtiene las características y tipos de casas del contexto
    const { feature, typeHouse } = useContext(HouseContext);
    
    // Función para alternar la visibilidad del menú de filtros
    const handleFilter = () => {
        getShowFilter(!showFilter);
    };

    let featuresChecked = query.get('features') 
        ? query.get('features').split(",") 
        : [];

    return(
        <>
            {/* Botón para mostrar el menú de filtros */}
            <ul className="properties-filter">
                <button title="filter" className="filter-button" onClick={handleFilter}>
                    <FilterButton />
                </button>
            </ul>

            {/* Menú de filtros */}
            <div className={`Menu-Filter ${showFilter && 'hidden'}`}>
                <div>
                    {/* Botón para cerrar el menú de filtros */}
                    <CancelButton style={{width:"30px",position:"absolute", top:"5px", right:"18px", cursor:"pointer", color:"#f35525"}} handleFilter={handleFilter}/>
                    <span style={{ position:"absolute", right:"2px", top:"30px", fontSize:"12px", fontWeight:"600", cursor:"pointer"}} onClick={handleFilter}>
                        Close Filter
                    </span>

                    {/* Botón para limpiar los filtros */}
                    <TrashIcon style={{width:"19px",position:"absolute", top:"8px", left:"19px", cursor:"pointer"}} handleClearFilter={handleClearFilter}/>
                    <span style={{ position:"absolute", left:"2px", top:"30px", fontSize:"12px", fontWeight:"600", cursor:"pointer"}} onClick={handleClearFilter}>
                        Clear Filter
                    </span>
                </div>

                {/* Formulario de filtros */}
                <form>
                    <h2 style={{color:"#1e1e1e", textAlign:"center", fontWeight:"bold", fontSize:"25px"}}>Search Filter</h2>
                    
                    {/* Filtro de Precio */}
                    <div className="container-form">
                        <label htmlFor="price">Price</label>
                        <div>
                            <select name="price" id="priceMin" defaultValue={query.get("minPrice") ? query.get("minPrice")  :"0"} onChange={handleChangeFilter}>
                                <option value="0" disabled>Min. Price</option>
                                <option value="">All</option>
                                <option value="50000">$50.000</option>
                                <option value="70000">$70.000</option>
                                <option value="100000">$100.000</option>
                                <option value="150000">$150.000</option>
                                <option value="200000">$200.000</option>
                                <option value="270000">$270.000</option>
                                <option value="300000">$300.000</option>
                            </select>
                            <select name="price" id="priceMax" defaultValue={query.get("maxPrice") ? query.get("maxPrice")  :"0"} onChange={handleChangeFilter}>
                                <option value="0" disabled>Max. Price</option>
                                <option value="">All</option>
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
                        <label htmlFor="sizeMin">Dimension</label>
                        <div>
                            <select name="sizeMin" id="sizeMin" defaultValue={query.get("minSize") ? query.get("minSize")  :"0"} onChange={handleChangeFilter}>
                                <option value="0" disabled>Min. Size</option>
                                <option value="">All</option>
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
                            <select name="sizeMax" id="sizeMax" defaultValue={query.get("maxSize") ? query.get("maxSize")  :""} onChange={handleChangeFilter}>
                                <option value="" disabled>Max. Size</option>
                                <option value="">All</option>
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
                        <label htmlFor="typeHouse">Type of House</label>
                        <div>
                            <select name="typeHouse" id="typeHouse" value={query.get("type_house") ? query.get("type_house") : ""} onChange={handleChangeFilter}>
                                <option value="" disabled>Select House</option>
                                <option value="0">All</option>

                                {
                                    typeHouse.map(item => {
                                        return (
                                            <option key={item.id} value={item.type_house}>
                                                {item.type_house}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    
                    {/* Filtro de Habitaciones */}
                    <div className="container-form selected-checkbox">
                        <label htmlFor="room">Bedrooms</label>
                        <div>
                            <input type="radio" name="room" id="room1" value="room-1" onChange={handleChangeFilter} checked={query.get("quarter") == 1} /><label htmlFor="room1">1 Bedroom</label>
                        </div>
                        <div>
                            <input type="radio" name="room" id="room2" value="room-2" onChange={handleChangeFilter} checked={query.get("quarter") == 2} /><label htmlFor="room2">2 Bedrooms</label>
                        </div>
                        <div>
                            <input type="radio" name="room" id="room3" value="room-3" onChange={handleChangeFilter} checked={query.get("quarter") == 3} /><label htmlFor="room3">3 Bedrooms</label>
                        </div>
                        <div>
                            <input type="radio" name="room" id="room4" value="room-4" onChange={handleChangeFilter} checked={query.get("quarter") == 4} /><label htmlFor="room4">4 or more Bedrooms</label>
                        </div>
                    </div>

                    {/* Filtro de Baños */}
                    <div className="container-form selected-checkbox">
                        <label>Bathrooms</label>
                        <div>
                            <input type="radio" name="bath" id="bath-1" value="bath-1" onChange={handleChangeFilter} checked={query.get("bathroom") == 1}/><label htmlFor="bath-1">1 bathroom</label>
                        </div>
                        <div>
                            <input type="radio" name="bath" id="bath-2" value="bath-2" onChange={handleChangeFilter} checked={query.get("bathroom") == 2}/><label htmlFor="bath-2">2 bathrooms</label>
                        </div>
                        <div>
                            <input type="radio" name="bath" id="bath-3" value="bath-3" onChange={handleChangeFilter} checked={query.get("bathroom") == 3}/><label htmlFor="bath-3">3 or more bathrooms</label>
                        </div>
                    </div>

                    {/* Filtro de Características */}
                    <div className="container-form selected-checkbox">
                        <label>Features</label>
                        {
                            feature.map((item, index) => {
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
