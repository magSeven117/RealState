import { Carousel } from 'react-bootstrap';
import { banner01, banner02, banner03 } from '../ImageAssets';
import React from 'react';

export function HeadingCarrusel () {
    return (
        <Carousel style={{height:"100%", marginTop:"100px"}}>
                <Carousel.Item style={{height:"100%"}} className='responsive-banner'>
                    <div className="position-relative" style={{height:"100%"}}>
                        <img
                        className="d-block w-100"
                        src={banner01}
                        alt="Toronto, Canada"
                        />
                        <div className="position-absolute left-0 top-0 z-20 w-100 h-100 text-home" style={{ padding: '8% 20%'}}>
                            <p 
                                className="bg-white"
                                style={{color:"#1e1e1e", fontSize:"20px", fontWeight:"500", textTransform:"capitalize", padding:"6px 15px", display:"inline-block", marginBottom:"30px"}}
                            >
                                    Toronto, <em style={{fontStyle:"normal",color:"#f35525"}}>Canada</em>
                            </p>

                            <h3 
                                className=" text-white mb-0" 
                                style={{fontSize:"80px", textTransform:"uppercase", lineHeight:"72px", width:"50%", fontWeight:"700"}}
                            >
                                Hurry! <br /> Get the Best Villa for you
                            </h3>
                        </div>
                    </div>
                </Carousel.Item>

                <Carousel.Item  style={{height:"100%"}} className='responsive-banner'>
                    <div className="position-relative" style={{height:"100%"}}>
                        <img
                        className="d-block w-100"
                        src={banner02}
                        alt="Melbourne, Australia"
                        />
                        <div className="position-absolute left-0 top-0 z-20 w-100 h-100 text-home" style={{ padding: '8% 20%'}}>
                            <p 
                                className="bg-white"
                                style={{color:"#1e1e1e", fontSize:"20px", fontWeight:"500", textTransform:"capitalize", padding:"6px 15px", display:"inline-block", marginBottom:"30px"}}
                            >
                                    Melbourne, <em style={{fontStyle:"normal",color:"#f35525"}}>Australia</em>
                            </p>

                            <h3 
                                className=" text-white mb-0" 
                                style={{fontSize:"80px", textTransform:"uppercase", lineHeight:"72px", width:"50%", fontWeight:"700"}}
                            >
                                Be Quick!<br/>Get the best villa in town
                            </h3>
                        </div>
                    </div>
                </Carousel.Item>

                <Carousel.Item  style={{height:"100%"}} className='responsive-banner'>
                    <div className="position-relative" style={{height:"100%"}}>
                        <img
                        className="d-block w-100"
                        src={banner03}
                        alt="Miami, South Florida"
                        />
                        <div className="position-absolute left-0 top-0 z-20 w-100 h-100 text-home" style={{ padding: '8% 20%'}}>
                            <p 
                                className="bg-white"
                                style={{color:"#1e1e1e", fontSize:"20px", fontWeight:"500", textTransform:"capitalize", padding:"6px 15px", display:"inline-block", marginBottom:"30px"}}
                            >
                                    Miami, <em style={{fontStyle:"normal",color:"#f35525"}}>South Florida</em>
                            </p>

                            <h3 
                                className=" text-white mb-0" 
                                style={{fontSize:"80px", textTransform:"uppercase", lineHeight:"72px", width:"50%", fontWeight:"700"}}
                            >
                                Act now!<br/>Get the best of penthouses
                            </h3>
                        </div>
                    </div>
                </Carousel.Item>
        </Carousel>
    )
}