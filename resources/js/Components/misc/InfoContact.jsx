import React from 'react';

export function InfoContact ({ wrap = false }) {
    // Establece el estilo basado en la prop 'wrap'
    const style = wrap ? {
        display: "flex",
        flexDirection: "column",
        gap: "10px",
    } : {};

    return (
        <div className="row" style={style}>
            <div className="col-lg-6">
                <div className="item phone">
                    <img src='/images/phone-icon.png' alt="Phone Icon" style={{ maxWidth: '40px' }} /> {/* Icono de teléfono */}
                    <h6>
                        010-020-0340
                        <br />
                        <span>Phone Number</span> {/* Etiqueta del número de teléfono */}
                    </h6>
                </div>
            </div>
            <div className="col-lg-6">
                <div className="item email">
                    <img src='/images/phone-icon.png' alt="Email Icon" style={{ maxWidth: '40px' }} /> {/* Icono de email */}
                    <h6>
                        trabajo.nestor.098@gmail.com
                        <br />
                        <span>Business Email</span> {/* Etiqueta del email */}
                    </h6>
                </div>
            </div>
        </div>
    )
}
