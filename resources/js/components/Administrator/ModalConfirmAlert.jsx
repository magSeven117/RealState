import React from "react";
import Button from 'react-bootstrap/Button'; // Importa el componente Button de Bootstrap
import Modal from 'react-bootstrap/Modal'; // Importa el componente Modal de Bootstrap

export function ModalConfirmAlert({ title, subtitle, button, typeButton, functionButton }) {
    return (
        <div
            style={{
                height: "100vh", 
                width: "100%",
                position: "fixed",
                top: 0,
                left: 0, 
                display: "flex", 
                justifyContent: "center",
                alignItems: "center", 
                zIndex: 9999
            }}
        >
            <div
                className="modal show"
                style={{
                    display: 'block', 
                    position: "relative",
                }}
            >
                <Modal.Dialog>
                    <Modal.Header>
                        <Modal.Title>{title}</Modal.Title> {/* Muestra el título del modal */}
                    </Modal.Header>

                    <Modal.Body>
                        <p>{subtitle}</p> {/* Muestra el subtítulo o contenido del modal */}
                    </Modal.Body>

                    <Modal.Footer>
                        <Button 
                            variant={typeButton} // Tipo de botón (ej. "primary", "secondary")
                            onClick={functionButton} // Función a ejecutar al hacer clic en el botón
                        >
                            {button} {/* Texto del botón */}
                        </Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </div>
        </div>
    )
}
