import React from "react";
import { Filter } from "@/Components/Filter";
import { RenderHouses } from "@/Components/RenderHouses";
import { Link } from "@inertiajs/react";

export function Houses({house, features, typeHouse}) {
    return (
        <div className="section properties">
            <div className="container">
                {/* Componente de filtrado de casas */}
                <Filter features={features} typeHouse={typeHouse}/>

                {/* Componente para mostrar las casas actuales */}
                <div className="row properties-box">
                    {
                        house.data.length !== 0 
                            ? <RenderHouses currentItems={house.data} />
                            : (
                                <h2 style={{ textAlign: "center" }}>
                                    No results found matching your search criteria.
                                </h2>
                            )
                    }
                </div>

                {/* Componente de navegación para la paginación */}
                {/* <Navigate pageCount={pageCount} handlePageClick={handlePageClick} /> */}
                <div className="justify-center pagination">
                    {house.links.map((link, index) => (
                        <Link
                            key={index}
                            href={link.url || "#"}
                            className={`px-3 py-1 mx-1 border ${link.active ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
    
}


