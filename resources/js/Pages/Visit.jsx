import { useEffect, useState } from "react";
import React from "react";
import { Header } from "@/Components/layout/Nav";
import { Footer } from "@/Components/layout/Footer";
import { FormVisit } from "@/Components/forms/FormVisit";
import { Previewhouse } from "@/Components/house/Previewhouse";
import { Head } from "@inertiajs/react";

export default function MakeVisit({ data }) {
    const [ ready, setReady ] = useState(false);

    return (
        <>
            <Head title="Schedule a Visit" />

            {/* Renderiza el componente Header */}
            <Header />
            
            {/* Muestra una vista previa de la propiedad */}
            <Previewhouse house={data} />

            {/* Muestra el formulario para agendar una visita, pasando los detalles de la propiedad */}
            <FormVisit house={data} />
                
            {/* Renderiza el componente Footer */}
            <Footer />
        </>
    );
}
