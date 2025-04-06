import React, { useEffect, useState } from 'react';

export function ContentVideo() {
    const [number, setNumber] = useState([0, 0, 0]);

    useEffect(() => {
        const array = [50, 12, 24]; // Números objetivo
        const intervalTime = 50;    // Velocidad de actualización en ms

        array.forEach((target, index) => {
            let current = 0;
            const interval = setInterval(() => {
                current++;
                setNumber((prev) => {
                    const newNumbers = [...prev];
                    newNumbers[index] = current;
                    return newNumbers;
                });
                if (current >= target) {
                    clearInterval(interval);
                }
            }, intervalTime);
        });
    }, []);

    return (
        <>
            {/* ***** Sección de Video Inicio ***** */}
            <div className="video section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 offset-lg-4">
                            <div className="text-center section-heading">
                                <h6>| Vista en Video</h6>
                                <h2>Observa de Cerca & Siente la Diferencia</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ***** Marco de Video Inicio ***** */}
            <div className="video-content">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 offset-lg-1">
                            <div className="video-frame">
                                <img src='/images/video-frame.webp' alt="Marco del Video" />
                                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                                    <i className="fa fa-play"></i> {/* Icono de reproducción */}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ***** Datos Curiosos Inicio ***** */}
            <div className="fun-facts">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="wrapper">
                                <div className="row">
                                    {/* Contadores para mostrar estadísticas */}
                                    <div className="col-lg-4">
                                        <div className="counter">
                                            <h2 className="timer count-title count-number" style={{ fontWeight: "700" }}>
                                                { number[0] }
                                            </h2>
                                            <p className="count-text">Edificios<br />Finalizados</p>
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="counter">
                                            <h2 className="timer count-title count-number" style={{ fontWeight: "700" }}>
                                                { number[1] }
                                            </h2>
                                            <p className="count-text">Años de<br />Experiencia</p>
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="counter">
                                            <h2 className="timer count-title count-number" style={{ fontWeight: "700" }}>
                                                { number[2] }
                                            </h2>
                                            <p className="count-text">Premios<br />Ganados en 2023</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* ***** Datos Curiosos Fin ***** */}
        </>
    );
}
