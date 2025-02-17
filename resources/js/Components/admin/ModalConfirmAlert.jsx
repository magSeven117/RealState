import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button'; // Importa el componente Button de Bootstrap
import Modal from 'react-bootstrap/Modal'; // Importa el componente Modal de Bootstrap

export function ModalConfirmAlert({ title, subtitle, button, typeButton, functionButton, buttonCancel, functionButtonCancel, selection, stateChangeSelection }) {
    const [ data, setData ] = useState();
    const [ active, setActive ] = useState(false);

    useEffect(()=>{
        // Se realiza una solicitud para obtener los datos de usuarios
        fetch('/api/users/')
            .then(res => res.json()) // Se convierte la respuesta a formato JSON
            .then(res => {
                // Si la respuesta es exitosa (status 200), se actualiza el estado de usuarios
                if (res.status === 200) {
                    setData(res.data);
                }
            });
    }, [])

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
                        {
                            (selection && data) 
                            && <div>
                                <label htmlFor="employee" style={{ marginRight:"5px" }}>Select an employee: </label>
                                <select 
                                    name="employee" 
                                    id="employee" 
                                    defaultValue={""} 
                                    onChange={(e) => {// Verificar si se ha seleccionado un empleado
                                        const selectedValue = e.target.value; // Obtener el valor seleccionado
                                        if (selectedValue) { // Si el valor no es vacío
                                            setActive(true); // Cambiar el estado a activo
                                            stateChangeSelection(selectedValue)
                                        } else {
                                            setActive(false); // Si no hay selección, mantenerlo inactivo
                                        }
                                    }} 
                                > 
                                    <option value="" disabled>Select an employee</option>
                                    {
                                        data.map(item=>{
                                            return(
                                                <option key={item.name+item.id} value={item.id}>{item.name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        }
                    </Modal.Body>

                    <Modal.Footer>
                        {
                            buttonCancel 
                            && <Button 
                                variant="secondary" // Tipo de botón
                                onClick={functionButtonCancel} // Función a ejecutar al hacer clic en el botón
                            >
                                {buttonCancel} {/* Texto del botón */}
                            </Button>
                        }
                        
                        <Button 
                            variant={typeButton} // Tipo de botón (ej. "primary", "secondary")
                            onClick={functionButton} // Función a ejecutar al hacer clic en el botón
                            disabled={selection ? !active : false}
                        >
                            {button} {/* Texto del botón */}
                        </Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </div>
        </div>
    )
}
