import { useContext } from "react";
import { HouseContext } from "../context/houseContext";
import React from 'react';

export function Productions () {
    const {houses} = useContext(HouseContext)

    if(houses.status === 200){
        return (
            <div className="error">
                <div className="error__title">Status {houses.status}/</div>
            </div>
        )
    } else {
        return (
            <div className="error">
                <div className="error__title">Error en la API o el GET</div>
            </div>
        )
    }
    
}