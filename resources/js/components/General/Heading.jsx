import { Link } from "react-router-dom";
import { heading } from "../ImageAssets";
import React from 'react';


export function Heading ({title}) {
    return (
        <div className="page-heading header-text" style={{backgroundImage:{heading}, marginTop:"100px"}}>
            <div className="container">
                <div className="row">
                <div className="col-lg-12">
                    <span className="breadcrumb">
                        <Link to="/">Home</Link> / {title}
                    </span>
                    <h3>{title}</h3>
                </div>
                </div>
            </div>
        </div>
    )
}