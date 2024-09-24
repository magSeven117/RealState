import { Footer } from "./components/General/Footer";
import { Header } from "./components/General/Nav";
import { Heading } from "./components/General/Heading";
import { Houses } from "./components/Houses/ControlHouses";
import React from 'react';

export function Properties () {
    return (
        <>
            {/* ***** Header Area Start ***** */}
            <Header />  {/* Renderiza el componente Header */}
            {/* ***** Header Area End ***** */}

            {/* ***** Heading Start ***** */}
            <Heading title="Properties" />  {/* Renderiza el componente Heading con el título "Properties" */}
            {/* ***** Heading End ***** */}

            {/* ***** Properties Section Start ***** */}
            <Houses />  {/* Renderiza el componente Houses que controla la lista de propiedades */}
            {/* ***** Properties Section End ***** */}

            {/* ***** Footer Section Start ***** */}
            <Footer />  {/* Renderiza el componente Footer */}
            {/* ***** Footer Section End ***** */}
        </>
    );
}
