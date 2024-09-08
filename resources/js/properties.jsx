import { Footer } from "./components/General/Footer";
import { Header } from "./components/General/Nav";
import { Heading } from "./components/General/Heading";
import { Houses } from "./components/Houses/ControlHouses";
import React from 'react';


export function Properties () {
    return (
        <>
            {/* ***** Header Area Start ***** */}
                <Header />
            {/* ***** Header Area End ***** */}

            {/* ***** Heading Start ***** */}
                <Heading title="Properties"/>
            {/* ***** Heading End ***** */}

            {/* ***** Properties Section Start ***** */}
                <Houses />
            {/* ***** Properties Section End ***** */}

            {/* ***** Properties Section Start ***** */}
                <Footer />
            {/* ***** Properties Section End ***** */}
        </>
    )
}