import React from "react";


export function Previewhouse({ house }) {
    return (
        <>
            <div className="previewHouses">
                <div>
                    <img src={house && house.images ? house.images[0] : ""} alt="Image House" />
                    
                    <div className="content-info">
                        <h1>{
                                house && house.type_house ? house.type_house.type_house : ""
                            }
                        </h1>
                        <span>
                            {house.description}
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}