import React, { useEffect, useState } from "react"; // Importa React y hooks
import Flatpickr from 'react-flatpickr'; // Importa el componente Flatpickr para selección de fechas
import "flatpickr/dist/themes/material_orange.css"; // Importa el tema de Flatpickr
import Button from 'react-bootstrap/Button'; // Importa el componente Button de React Bootstrap
import Modal from 'react-bootstrap/Modal'; // Importa el componente Modal de React Bootstrap

export function FormVisit({ house }) {
    // Estado para manejar mensajes de error, visibilidad del mensaje y la fecha programada
    const [ error, setError ] = useState(""); 
    const [ showMessage, setShowMessage ] = useState(false);
    const [ schedule, setSchedule ] = useState(""); // Almacena la fecha programada

    // Función que maneja el envío del formulario
    const handleForm = (e) => {
        e.preventDefault(); // Previene el comportamiento por defecto del formulario
        const form = document.getElementById('formVisit'); // Obtiene el formulario por su ID

        // Validaciones del formulario
        if(!e.target.calendar.value) {
            setError("Select the date."); // Verifica si se seleccionó una fecha
            return;
        }
        if(!e.target.name.value || !e.target.email.value || !e.target.lastname.value || !e.target.phone.value) {
            setError("Fill in the information."); // Verifica que todos los campos estén llenos
            return;
        }
        if(!e.target.terms.checked) {
            setError("Must accept the terms and conditions."); // Verifica si se aceptaron los términos
            return;
        }

        setError(""); // Limpia el mensaje de error si todo es válido

        // Obtiene los datos del formulario
        const data = new FormData(form); 
        const method = form.getAttribute('method'); // Obtiene el método (POST)
        const action = form.getAttribute('action') // Obtiene la acción (URL de envío)
        const encabezado = new Headers(); // Crea un nuevo objeto Headers

        // Configuración para la solicitud fetch
        const config = {
            method: method,
            header: encabezado,
            mode: "cors",
            cache: 'no-cache',
            body: data,
        };

        // Realiza la solicitud fetch
        fetch(action, config)
            .then(res => res.json()) // Convierte la respuesta a JSON
            .then(res => {
                console.log(res); // Imprime la respuesta en consola
                if(res.status == 422) { // Manejo de errores de validación
                    Object.keys(res.errors).forEach(item => {
                        setError(res.errors[item][0]); // Establece el primer error encontrado
                        return;
                    });
                }

                // Manejo de errores de servidor
                if(res.status == 404 || res.status == 500) {
                    setError("Server Error."); // Establece un mensaje de error para errores de servidor
                    return;
                }

                setSchedule(res.data.date_visit); // Almacena la fecha de la cita
                setShowMessage(true); // Muestra el mensaje de éxito
            })
            .catch(e => console.log(e)); // Manejo de errores de la solicitud
    };

    return(
        <>
            <div className="Container-form" style={{ padding: "8px" }}>
                <form action={'/api/visit/' + house.id} method="POST" className="formVisit" id="formVisit" onSubmit={handleForm}>
                    <h2>Schedule a visit</h2>
                    <div>
                        <input 
                            placeholder="Name" 
                            className="input-visit" 
                            name="name"
                            id="name" 
                            type="text"
                            required /> {/* Campo para nombre */}
                        
                        <input 
                            placeholder="Last Name" 
                            className="input-visit" 
                            name="lastname" 
                            id="lastname"
                            type="text" 
                            required /> {/* Campo para apellido */}
                    </div>
                    <div>
                        <input 
                            placeholder="Email address" 
                            className="input-visit" 
                            name="email" 
                            id="email"
                            type="email" 
                            required /> {/* Campo para email */}
                    </div>
                    <div>
                        <input 
                            placeholder="Number" 
                            className="input-visit" 
                            type="text" 
                            id="phone" 
                            name="phone" 
                            required /> {/* Campo para número de teléfono */}
                    </div>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <Flatpickr 
                            className="input-visit"
                            style={{ width: "200px", height: "35px" }}
                            placeholder="Calendar"
                            name="calendar"
                            id="calendar"
                            options={{ 
                                minDate: "today", // Fecha mínima
                                maxDate: new Date().fp_incr(120), // Fecha máxima (120 días en el futuro)
                                enableTime: true, // Habilita la selección de tiempo
                                dateFormat: "Y-m-d H:i", // Formato de fecha
                            }}
                            required
                        />
                    </div>
                    <div>
                        <label className="container-checkbox">
                            <input  
                                type="checkbox" 
                                name="terms"
                                id="terms"
                                required /> {/* Checkbox para aceptar términos */}
                            <div className="checkmark"></div>
                        </label>
                        <span>Accept Terms and Conditions.</span>
                    </div>
                    <div>
                        <span style={{ textAlign: "center", fontSize: "12px", color: "red", fontWeight: "600", width: "100%" }}>
                            { error && error } {/* Muestra el mensaje de error si existe */}
                        </span>
                    </div>
                    <div style={{ justifyContent: "center" }}>
                        <button>
                            <span className="button_top"> Send Schedule </span>
                        </button>
                    </div>
                </form>
            </div>

            {
                showMessage ? 
                <div
                    style={{
                        height: "100vh",
                        width: "100%",
                        position: "fixed",  // Fija el modal para que siempre esté en pantalla
                        top: 0,
                        left: 0,
                        display: "flex",
                        justifyContent: "center", // Centra horizontalmente
                        alignItems: "center",     // Centra verticalmente
                        zIndex: 9999              // Asegura que esté por encima de otros elementos
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
                                <Modal.Title>Scheduled appointment</Modal.Title> {/* Título del modal */}
                            </Modal.Header>

                            <Modal.Body>
                                <p>Appointment was scheduled for {schedule}, we will contact you shortly.</p> {/* Mensaje con la fecha programada */}
                            </Modal.Body>

                            <Modal.Footer>
                                <Button 
                                    variant="dark" 
                                    onClick={() => {
                                        setShowMessage(false); // Oculta el mensaje
                                        setTimeout(() => {
                                            window.location.href = '/properties'; // Redirige a la página de propiedades
                                        }, 200);
                                    }}
                                >
                                    Accept {/* Botón para cerrar el modal */}
                                </Button>
                            </Modal.Footer>
                        </Modal.Dialog>
                    </div>
                </div>
                : "" // Si no se debe mostrar el mensaje, no se renderiza nada
            }
        </>
    );
}
