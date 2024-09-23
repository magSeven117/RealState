import React from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export function ModalConfirmAlert({ title, subtitle, button, typeButton, functionButton }) {
    return(
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
                        <Modal.Title>{title}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <p>{subtitle}</p>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button 
                            variant={typeButton} 
                            onClick={functionButton}
                        >
                            {button}
                        </Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </div>
        </div>
    )
}