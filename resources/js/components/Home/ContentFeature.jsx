import { useState } from "react";
import { feature, featureIcon, infoIcon01, infoIcon02, infoIcon03, infoIcon04 } from "../ImageAssets";
import React from 'react';


export function ContenFeature () {
    const [showFeature, setShowFeature ] = useState(0)

    const handleChangeFeatures = (num)=>{
        setShowFeature(num)
    }

    return (
        <div className="featured section">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4">
                        <div className="left-image">
                            <img src={feature} alt="Featured" />
                            <a href="property-details.html">
                                <img
                                    src={featureIcon}
                                    alt="Featured Icon"
                                    style={{ maxWidth: '60px', padding: '0px' }}
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
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingOne" onClick={()=>{handleChangeFeatures(0)}}>
                                    <button className="accordion-button">
                                        Best useful links ?
                                    </button>
                                </h2>
                                <div id="collapseOne" className={`accordion-collapse collapse ${showFeature == 0 && 'show'}`}>
                                    <div className="accordion-body">
                                        Get <strong>the best villa</strong> website template in HTML CSS and Bootstrap for your business. TemplateMo provides you the{' '}
                                        <a href="https://www.google.com/search?q=best+free+css+templates" target="_blank" rel="noopener noreferrer">
                                            best free CSS templates
                                        </a>{' '}
                                        in the world. Please tell your friends about it.
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingTwo" onClick={()=>{handleChangeFeatures(1)}}>
                                    <button
                                    className="accordion-button collapsed"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#collapseTwo"
                                    aria-expanded="false"
                                    aria-controls="collapseTwo"
                                    >
                                    How does this work ?
                                    </button>
                                </h2>
                                <div id="collapseTwo" className={`accordion-collapse collapse ${showFeature == 1 && 'show'}`}>
                                    <div className="accordion-body">
                                        Dolor <strong>almesit amet</strong>, consectetur adipiscing elit, sed doesn't eiusmod tempor incididunt ut labore consectetur <code>adipiscing</code> elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingThree" onClick={()=>{handleChangeFeatures(2)}}>
                                    <button className="accordion-button collapsed">
                                    Why is Villa Agency the best ?
                                    </button>
                                </h2>
                                <div id="collapseThree" className={`accordion-collapse collapse ${showFeature == 2  && 'show'}`}>
                                    <div className="accordion-body">
                                        Dolor <strong>almesit amet</strong>, consectetur adipiscing elit, sed doesn't eiusmod tempor incididunt ut labore consectetur <code>adipiscing</code> elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="info-table">
                            <ul>
                                <li>
                                    <img src={infoIcon01} alt="Icon 1" style={{ maxWidth: '52px' }} />
                                    <h4>
                                    250 m2<br />
                                    <span>Total Flat Space</span>
                                    </h4>
                                </li>
                                <li>
                                    <img src={infoIcon02} alt="Icon 2" style={{ maxWidth: '52px' }} />
                                    <h4>
                                    Contract<br />
                                    <span>Contract Ready</span>
                                    </h4>
                                </li>
                                <li>
                                    <img src={infoIcon03} alt="Icon 3" style={{ maxWidth: '52px' }} />
                                    <h4>
                                    Payment<br />
                                    <span>Payment Process</span>
                                    </h4>
                                </li>
                                <li>
                                    <img src={infoIcon04} alt="Icon 4" style={{ maxWidth: '52px' }} />
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
    )
}