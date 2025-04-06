import { Head, Link } from '@inertiajs/react';
import { Header } from '@/Components/layout/Nav';
import { HeadingCarrusel } from '@/Components/layout/Carousel';
import { ContenFeature } from '@/Components/features/ContentFeature';
import { ContentVideo } from '@/Components/features/ContentVideo';
import { BestDeal } from '@/Components/BestDeal';
import { RenderContact } from '@/Components/misc/ContactContent';
import { Footer } from '@/Components/layout/Footer';
import { RenderHouses } from '@/Components/house/RenderHouses';

export default function Home({ data }) {
    return (
        <>
            <Head title='Inicio'/>
            {/* ***** Inicio del Área de Encabezado ***** */}
            <Header />
            {/* ***** Fin del Área de Encabezado ***** */}

            {/* ***** Inicio del Carrusel ***** */}
            <HeadingCarrusel />
            {/* ***** Fin del Carrusel ***** */}

            {/* ***** Inicio de la Sección Destacada ***** */}
            <ContenFeature />
            {/* ***** Fin de la Sección Destacada ***** */}
            
            {/* ***** Inicio de la Sección de Video ***** */}
            <ContentVideo />
            {/* ***** Fin de la Sección de Video ***** */}

            {/* ***** Inicio de la Sección de Mejores Ofertas ***** */}
            <BestDeal />
            {/* ***** Fin de la Sección de Mejores Ofertas ***** */}

            {/* ***** Inicio de la Sección de Propiedades ***** */}
            <div className="properties section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 offset-lg-4">
                            <div className="text-center section-heading">
                                <h6>| Propiedades</h6>
                                <h2>Te ofrecemos las mejores propiedades según tus preferencias</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {
                            <RenderHouses currentItems={data} /> // Muestra las primeras 6 casas
                        }
                    </div>
                </div>
            </div>
            {/* ***** Fin de la Sección de Propiedades ***** */}

            {/* ***** Inicio de la Sección de Contacto ***** */}
            <RenderContact />
            {/* ***** Fin de la Sección de Contacto ***** */}

            {/* ***** Inicio de la Sección del Pie de Página ***** */}
            <Footer />
            {/* ***** Fin de la Sección del Pie de Página ***** */}
        </>
    );
}
