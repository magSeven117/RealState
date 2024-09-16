import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import React from "react";
import { Header } from "./components/General/Nav";
import { Footer } from "./components/General/Footer";
import { FormVisit } from "./components/Visit/FormVisit";
import { Previewhouse } from "./components/Houses/Previewhouse";


const URL_API_HOUSE = '/api/houses/?id=';

export function MakeVisit() {
    const { id } = useParams()
    const [ house, setHouse ] = useState({})


    useEffect(()=>{
        fetch(URL_API_HOUSE+id)
            .then(res=>res.json())
            .then(res => {
                setHouse(res.data[0]);
            })
    }, [])

    return(
        <>
            <Header />

            <Previewhouse house={house}/>

            <FormVisit house={house}/>

            <Footer />
        </>
    )   
}