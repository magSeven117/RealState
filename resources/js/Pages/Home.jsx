import { Head, Link } from '@inertiajs/react';
import { useContext, useEffect } from 'react';
import { Header } from '@/Components/Nav';
import { HeadingCarrusel } from '@/Components/HeadingCarrusel';
import { ContenFeature } from '@/Components/ContentFeature';
import { ContentVideo } from '@/Components/ContentVideo';
import { BestDeal } from '@/Components/BestDeal';
import { RenderContact } from '@/Components/ContactContent';
import { Footer } from '@/Components/Footer';
import { RenderHouses } from '@/Components/RenderHouses';

export default function Welcome({ data }) {
    return (
        <>
            <Head title='Home'/>
            {/* ***** Header Area Start ***** */}
            <Header />
            {/* ***** Header Area End ***** */}

            {/* ***** Heading Carrusel Start ***** */}
            <HeadingCarrusel />
            {/* ***** Heading Carrusel End ***** */}

            {/* ***** Featured Section Start ***** */}
            <ContenFeature />
            {/* ***** Featured Section End ***** */}
            
            {/* ***** Video Section Start ***** */}
            <ContentVideo />
            {/* ***** Video Section End ***** */}

            {/* ***** Best Deal Section Start ***** */}
            <BestDeal />
            {/* ***** Best Deal Section End ***** */}

            {/* ***** Properties Section Start ***** */}
            <div className="properties section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 offset-lg-4">
                            <div className="text-center section-heading">
                                <h6>| Properties</h6>
                                <h2>We Provide The Best Property You Like</h2>
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
            {/* ***** Properties Section End ***** */}

            {/* ***** Contact Section Start ***** */}
            <RenderContact />
            {/* ***** Contact Section End ***** */}

            {/* ***** Footer Section Start ***** */}
            <Footer />
            {/* ***** Footer Section End ***** */}
        </>
    );
}
    
