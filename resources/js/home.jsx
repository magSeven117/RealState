import { HeadingCarrusel } from "./components/Home/HeadingCarrusel";
import { Footer } from "./components/General/Footer";
import { useContext, useEffect } from 'react';
import { Header } from "./components/General/Nav";
import { BestDeal } from "./components/Home/BestDeal";
import { HouseContext } from "./context/houseContext";
import { RenderHouses } from "./components/Houses/RenderHouses";
import { RenderContact } from "./components/Home/ContactContent";
import { ContentVideo } from "./components/Home/ContentVideo";
import { ContenFeature } from "./components/Home/ContentFeature";
import React from 'react';

export function Home() {
    // Obtiene el contexto de las casas desde HouseContext
    const { houses, setUrlAPI } = useContext(HouseContext);

    // Se actualiza la URL de la API cuando el componente se monta
    useEffect(() => {
        setUrlAPI("/api/houses");
    }, [setUrlAPI]);

    return (
        <>
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
                            <div className="section-heading text-center">
                                <h6>| Properties</h6>
                                <h2>We Provide The Best Property You Like</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {
                            houses.status === 200 
                            ? <RenderHouses currentItems={houses.data.slice(0, 6)} /> // Muestra las primeras 6 casas
                            : <div>
                                <h3 style={{textAlign:"center", color:"#ee5f4f"}}>
                                    Houses not available!
                                </h3>
                            </div>
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
