import React from "react";
import { Spinner } from "react-bootstrap";
import { Filter } from "../Houses/Filter";


export function NotFound () {
    return(
        <div className="section properties">
            <div className="container">
                {/* Componente de filtrado de casas */}
                <Filter />
                
                {/* Componente para mostrar el loader mientras se obtienen los datos */}
                <div className="center-spinner">
                    <Spinner animation="border" />
                </div>
            </div>
        </div>
    )
}