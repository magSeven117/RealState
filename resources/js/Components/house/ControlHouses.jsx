import React from "react";
import { Filter } from "@/Components/filters/Filter";
import { RenderHouses } from "@/Components/house/RenderHouses";
import { Link } from "@inertiajs/react";

export function Houses({house, features, typeHouse}) {
    return (
        <div className="section properties">
            <div className="container">
                {/* Componente de filtrado de proyectos sobre planos */}
                <Filter features={features} typeHouse={typeHouse}/>

                {/* Componente para mostrar los proyectos disponibles */}
                <div className="row properties-box">
                    {
                        house.data.length !== 0 
                            ? <RenderHouses currentItems={house.data} />
                            : (
                                <h2 style={{ textAlign: "center" }}>
                                    No se encontraron resultados que coincidan con tu búsqueda.
                                </h2>
                            )
                    }
                </div>

                {/* Componente de navegación para la paginación */}
                <div className="justify-center pagination">
                    {house.links.map((link, index) => (
                        <Link
                            key={index}
                            href={link.url || "#"}
                            className={`px-3 py-1 mx-1 border font-medium border-2 ${link.active ? "bg-[#1e1e1e] text-white" : "bg-[#fafafa] border-[#1e1e1e] text-[#1e1e1e] hover:bg-[#f35525] transition-all duration-300"}`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}