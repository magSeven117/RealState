import React from 'react';

export function Footer () {

    return (
        <>
            <footer>
                <div className="container"> {/* Contenedor principal del footer */}
                    <div className="px-1 py-5 w-100"> {/* Columna que ocupa 8 de 12 espacios en un sistema de cuadrícula */}
                        <p>
                            The design of the home page and properties page 
                            were taken from <a href='https://www.free-css.com/' style={{ color:"#f35525", fontWeight:"600" }}>https://www.free-css.com/</a>, 
                            the rest and functions were created by 
                            Ndnestor <a href='https://github.com/Ndnestor098' style={{ color:"#f35525", fontWeight:"600" }}>https://github.com/Ndnestor098</a> 
                        </p> {/* Texto de copyright */}
                    </div>
                </div>
            </footer>
        </>
    );
}
