import { Footer } from "./components/General/Footer";
import { Header } from "./components/General/Nav";
import { Heading } from "./components/General/Heading";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Loader } from "./components/General/Loader";
import { bathroom, room, sizeIcon } from "./components/ImageAssets";
import React from 'react';
import { LinkVisit } from "./components/General/LinkVisit";
import { CarouselRenderHouses } from "./components/Houses/CarouselRenderHouses";

const URL_API_HOUSE = '/api/houses/?id=';

export function PropertiesDetails () {
    const { id } = useParams();
    const [ house, setHouse ] = useState({});
    const [ response, setResponse ] = useState(false);
    const [ activeCarousel , setActiveCarousel ] = useState(false);


    useEffect(()=>{
        fetch(URL_API_HOUSE+id)
            .then(res=>res.json())
            .then(res => {
                setHouse(res.data[0]);
                setResponse(true);
            })
            .catch(e => {
                setResponse(false);
            })
    }, []);

    const handleActiveCarousel = (value) => {
        setActiveCarousel(value);
        if(value)
            document.body.style.overflow = "hidden";
        else 
            document.body.style.overflow = "";
    };

    return (
        <>
            {/* ***** Header Area Start ***** */}
                <Header />
            {/* ***** Header Area End ***** */}

            {/* ***** Heading Start ***** */}
                <Heading title="Single Property"/>
            {/* ***** Heading End ***** */}

            {/* ***** Conent Page Start ***** */}
            {
                response & typeof house == 'object'
                ? <div className="single-property section">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8">
                                <div className="main-image">
                                    <img
                                        src={house.images[0]}
                                        alt={`house principal`}
                                        className="image-details"
                                        style={{ cursor:"pointer" }}
                                        onClick={()=>handleActiveCarousel(true)}
                                    />

                                    <div style={{ marginTop:"10px" }}>
                                        <span style={{ fontWeight:"600", cursor:"pointer" }} onClick={()=>handleActiveCarousel(true)}>
                                            View More Images
                                        </span>
                                    </div>
                                </div>
                                { 
                                    activeCarousel && <CarouselRenderHouses house={house} handleActiveCarousel={handleActiveCarousel}/>
                                }

                                <div className="main-content">
                                    <div className="content-info-price">
                                        <span className="category">
                                            {house.type_house.type_house}
                                        </span>
                                        <p className="price">${Number(Math.floor(house.price)).toLocaleString("de-DE")}</p>
                                    </div>
                                    
                                    <h4>
                                        {house.address}
                                    </h4>
                                    <p>
                                        {house.description}
                                        <br />
                                        <br />
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat quaerat ipsa quos aliquid itaque ullam qui quam illo id. Id ea officia cum amet quibusdam non, illo molestiae? Ipsa, non in, ab ea doloribus ullam quaerat totam maiores fuga consectetur eligendi. Reprehenderit, repellendus! Alias incidunt ea possimus id deserunt delectus! Reiciendis consequuntur id excepturi est iure sit neque, iste dolorem dolorum fugit illo voluptate, aliquid, eveniet modi officia laboriosam ut facilis. Ea exercitationem ut quidem atque, rerum totam similique culpa vitae expedita ullam harum accusantium illum aliquam ex fuga pariatur eligendi perspiciatis. Rerum reiciendis ipsum a, quaerat omnis inventore voluptates.
                                    </p>
                                </div>

                                <div className="accordion" id="accordionExample">
                                    <div className="accordion-item">
                                        <h2 className="accordion-header">
                                            <button
                                                className="accordion-button"
                                                type="button"
                                            >
                                                Features
                                            </button>
                                        </h2>
                                        <div className="accordion-collapse collapse show">
                                            <div className="accordion-body">
                                                {
                                                    house.features.map(item => {
                                                        return(
                                                            <p key={item.id} style={{ fontWeight:"600", margin:"0", textTransform:"capitalize"}}>
                                                                &bull; {item.name}
                                                            </p>
                                                        )
                                                    })
                                                }
                                                <p style={{ fontWeight:"600", margin:"0" }}>
                                                    &bull; Flat Space {Math.floor(house.size)}m²
                                                </p>
                                                <p style={{ fontWeight:"600", margin:"0" }}>
                                                    &bull; {house.quarters} {house.quarters > 1 ? 'Rooms' : 'Room'}
                                                </p>
                                                <p style={{ fontWeight:"600", margin:"0" }}>
                                                    &bull; {house.bathroom} {house.bathroom > 1 ? 'Bathrooms' : 'Bathroom'}
                                                </p>
                                                <p style={{ fontWeight:"600", margin:"0" }}>
                                                    &bull; Build in {house.date_construction.split('-')[0]}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="col-lg-4" style={{ padding: "0 35px" }}>
                                <div style={{ marginBottom:"20px" }}>
                                    <LinkVisit id={id} />
                                </div>
                                <div className="info-table">
                                    <ul style={{ paddingLeft: "0" }}>
                                        <li>
                                            <img src={sizeIcon} alt="" style={{ width:"50px" }}/>
                                            <h4>
                                                {Math.floor(house.size)}m²
                                                <br />
                                                <span>Total Flat Space</span>
                                            </h4>
                                        </li>
                                        <li>
                                            <img src={room} alt="" style={{ width:"50px" }}/>
                                            <h4>
                                                {house.quarters}
                                                <br />
                                                <span>Total {house.quarters > 1 ? 'Rooms' : 'Room'}</span>
                                            </h4>
                                        </li>
                                        <li>
                                            <img src={bathroom} alt="" style={{ width:"50px" }}/>
                                            <h4>
                                                {house.bathroom}
                                                <br />
                                                <span>Total {house.bathroom > 1 ? 'Bathrooms' : 'Bathroom'}</span>
                                            </h4>
                                        </li>

                                    </ul>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                : <div  className="single-property section">
                    <Loader />
                </div>
            }
            {/* ***** Conent Page End ***** */}


            {/* ***** Properties Section Start ***** */}
                <Footer />
            {/* ***** Properties Section End ***** */}
        </>
    );
}