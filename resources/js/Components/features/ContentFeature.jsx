import { useState } from "react";
import React from 'react';

export function ContenFeature() {
    const [showFeature, setShowFeature] = useState(0); // Estado para controlar qué acordeón mostrar

    const handleChangeFeatures = (num) => {
        setShowFeature(num); // Actualiza el estado al número del acordeón seleccionado
    };

    return (
        <div className="featured section">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4">
                        <div className="left-image">
                            <img src='/images/featured.jpg' alt="Featured" />
                            <a href="property-details.html">
                                <img
                                    src='/images/featured-icon.png' 
                                    alt="Featured Icon"
                                    style={{ maxWidth: '60px', padding: '0px' }}
                                    className="max-w-[60px] p-0 absolute top-[24%] left-[28%]"
                                />
                            </a>
                        </div>
                    </div>
                    <div className="col-lg-5">
                        <div className="section-heading">
                            <h6>| Featured</h6>
                            <h2>Best Apartment &amp; Sea view</h2>
                        </div>
                        <div className="accordion" id="accordionExample">
                            {/* Primer ítem del acordeón */}
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingOne" onClick={() => { handleChangeFeatures(0); }}>
                                    <button className={`accordion-button ${showFeature === 0 ? '' : 'collapsed'}`}>
                                        Best useful links ?
                                    </button>
                                </h2>
                                <div id="collapseOne" className={`accordion-collapse ${showFeature === 0 ? 'show' : 'collapse'}`}>
                                    <div className="accordion-body">
                                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere iusto aliquam possimus vero rerum! Vel provident itaque nisi praesentium id illum quas! Ipsa aliquid quod mollitia placeat velit fugit ipsam.
                                    </div>
                                </div>
                            </div>
                            {/* Segundo ítem del acordeón */}
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingTwo" onClick={() => { handleChangeFeatures(1); }}>
                                    <button className={`accordion-button ${showFeature === 1 ? '' : 'collapsed'}`}>
                                        How does this work ?
                                    </button>
                                </h2>
                                <div id="collapseTwo" className={`accordion-collapse ${showFeature === 1 ? 'show' : 'collapse'}`}>
                                    <div className="accordion-body">
                                        Dolor <strong>almesit amet</strong>, consectetur adipiscing elit, sed does not eiusmod tempor incididunt ut labore consectetur <code>adipiscing</code> elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    </div>
                                </div>
                            </div>
                            {/* Tercer ítem del acordeón */}
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingThree" onClick={() => { handleChangeFeatures(2); }}>
                                    <button className={`accordion-button ${showFeature === 2 ? '' : 'collapsed'}`}>
                                        Why is Villa Agency the best ?
                                    </button>
                                </h2>
                                <div id="collapseThree" className={`accordion-collapse ${showFeature === 2 ? 'show' : 'collapse'}`}>
                                    <div className="accordion-body">
                                        Dolor <strong>almesit amet</strong>, consectetur adipiscing elit, sed does not eiusmod tempor incididunt ut labore consectetur <code>adipiscing</code> elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="info-table">
                            <ul>
                                {/* Información adicional sobre propiedades */}
                                <li>
                                    <img src='/images/info-icon-01.png' alt="Icon 1" style={{ maxWidth: '52px' }} />
                                    <h4>
                                        250 m2<br />
                                        <span>Total Flat Space</span>
                                    </h4>
                                </li>
                                <li>
                                    <img src='/images/info-icon-02.png' alt="Icon 2" style={{ maxWidth: '52px' }} />
                                    <h4>
                                        Contract<br />
                                        <span>Contract Ready</span>
                                    </h4>
                                </li>
                                <li>
                                    <img src='/images/info-icon-03.png' alt="Icon 3" style={{ maxWidth: '52px' }} />
                                    <h4>
                                        Payment<br />
                                        <span>Payment Process</span>
                                    </h4>
                                </li>
                                <li>
                                    <img src='/images/info-icon-04.png' alt="Icon 4" style={{ maxWidth: '52px' }} />
                                    <h4>
                                        Safety<br />
                                        <span>24/7 Under Control</span>
                                    </h4>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
