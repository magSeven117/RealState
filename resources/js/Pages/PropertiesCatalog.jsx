import { Houses } from '@/Components/house/ControlHouses';
import { Footer } from '@/Components/layout/Footer';
import { Heading } from '@/Components/layout/Heading';
import { Header } from '@/Components/layout/Nav';
import { Head } from '@inertiajs/react';

export default function Dashboard({data, features, typeHouse}) {
    
    return (
        <>
            <Head title='Properties' />

            {/* ***** Header Area Start ***** */}
            <Header />  {/* Renderiza el componente Header */}
            {/* ***** Header Area End ***** */}

            {/* ***** Heading Start ***** */}
            <Heading title="Properties" />  {/* Renderiza el componente Heading con el título "Properties" */}
            {/* ***** Heading End ***** */}

            {/* ***** Properties Section Start ***** */}
            <Houses house={data} features={features} typeHouse={typeHouse}/>  {/* Renderiza el componente Houses que controla la lista de propiedades */}
            {/* ***** Properties Section End ***** */}

            {/* ***** Footer Section Start ***** */}
            <Footer />  {/* Renderiza el componente Footer */}
            {/* ***** Footer Section End ***** */}
        </>
    );
}
