import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { CancelButton } from "../ImageAssets";

export function Gallery({ house, handleActiveCarousel }) {
    const images = house.images.map((img) => ({
        original: img,     
        thumbnail: img,   
    }));

    return (
        <div className="image-container-details">
            <div className="image-subcontainer-details">
                {/* Botón para cerrar la galería */}
                <CancelButton 
                    style={{ 
                        width: "40px", 
                        position: "absolute", 
                        color: "#fff", 
                        top: "10px", 
                        right: "10px", 
                        cursor: "pointer" 
                    }} 
                    onClick={() => handleActiveCarousel(false)} 
                />

                <ImageGallery 
                    items={images}
                    renderItem={(item) => (
                        <img 
                            className="image-gallery-image" 
                            src={item.original} 
                            alt={`House image ${item.original}`} 
                            style={{ maxHeight: "700px" }} 
                        />
                    )}    
                />
            </div>
        </div>
    );
}
