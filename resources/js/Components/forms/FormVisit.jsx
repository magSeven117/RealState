import { React, useState } from "react"; // Importa React y hooks
import Flatpickr from 'react-flatpickr'; // Importa el componente Flatpickr para selección de fechas
import "flatpickr/dist/themes/material_orange.css"; // Importa el tema de Flatpickr
import Button from 'react-bootstrap/Button'; // Importa el componente Button de React Bootstrap
import Modal from 'react-bootstrap/Modal'; // Importa el componente Modal de React Bootstrap
import { useForm } from "@inertiajs/react";

export function FormVisit({ house }) {
    // Estado para manejar mensajes de error, visibilidad del mensaje y la fecha programada
    const [ error, setError ] = useState(""); 
    const [ showMessage, setShowMessage ] = useState(false);
    const { data, setData, post, errors } = useForm({
        'name' : "",
        "last_name" : "",
        "email" : "",
        "phone" : "",
        "calendar" : "",
        "term" : "",
    })


    // Función que maneja el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault(); // Previene el comportamiento por defecto del formulario

        post('/visit/'+house.id, {
            onSuccess : () =>{
                setShowMessage(true);
            }
        });
    };

    return(
        <>
            <div className="Container-form" style={{ padding: "8px" }}>
                <form className="formVisit" id="formVisit" onSubmit={handleSubmit}>
                    <h2>Schedule a visit</h2>
                    
                    {/* Input Name and Last Name */}
                    <div>
                        <input 
                            placeholder="Name" 
                            className="input-visit" 
                            name="name"
                            onChange={e=>{setData('name', e.target.value)}}
                            value={data.name}
                            id="name" 
                            type="text"
                            required /> {/* Campo para nombre */}
                        
                        <input 
                            placeholder="Last Name" 
                            className="input-visit" 
                            name="last_name"
                            onChange={e=>{setData('last_name', e.target.value)}}
                            value={data.last_name} 
                            id="last_name"
                            type="text" 
                            required /> {/* Campo para apellido */}
                    </div>
                    <div>
                        <span style={{ textAlign: "center", fontSize: "12px", color: "red", fontWeight: "600", width: "100%" }}>
                            { errors.name || errors.last_name } {/* Muestra el mensaje de error si existe */}
                        </span>
                    </div>
                    
                    {/* Input Email */}
                    <div>
                        <input 
                            placeholder="Email address" 
                            className="input-visit" 
                            name="email" 
                            id="email"
                            onChange={e=>{setData('email', e.target.value)}}
                            value={data.email} 
                            type="email" 
                            required /> {/* Campo para email */}
                    </div>
                    <div>
                        <span style={{ textAlign: "center", fontSize: "12px", color: "red", fontWeight: "600", width: "100%" }}>
                            { errors.email } {/* Muestra el mensaje de error si existe */}
                        </span>
                    </div>

                    {/* input Phone */}
                    <div>
                        <input 
                            placeholder="Phone" 
                            className="input-visit" 
                            type="text" 
                            id="phone" 
                            onChange={e=>{setData('phone', e.target.value)}}
                            value={data.phone} 
                            name="phone" 
                            required /> {/* Campo para número de teléfono */}
                    </div>
                    <div>
                        <span style={{ textAlign: "center", fontSize: "12px", color: "red", fontWeight: "600", width: "100%" }}>
                            { errors.phone } {/* Muestra el mensaje de error si existe */}
                        </span>
                    </div>

                    {/* Input Calendar */}
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
                            onChange={(selectedDates, dateStr, instance) => {
                                setData("calendar", dateStr);
                              }}
                            required
                        />
                    </div>
                    <div>
                        <span style={{ textAlign: "center", fontSize: "12px", color: "red", fontWeight: "600", width: "100%" }}>
                            { errors.calendar } {/* Muestra el mensaje de error si existe */}
                        </span>
                    </div>

                    {/* Input Term */}
                    <div>
                        <label className="container-checkbox">
                            <input  
                                type="checkbox" 
                                name="terms"
                                id="terms"
                                onChange={e=>{setData('term', e.target.checked)}}
                                value={data.term} 
                                required /> {/* Checkbox para aceptar términos */}
                            <div className="checkmark"></div>
                        </label>
                        <span>Accept Terms and Conditions.</span>
                    </div>
                    <div>
                        <span style={{ textAlign: "center", fontSize: "12px", color: "red", fontWeight: "600", width: "100%" }}>
                            { errors.term } {/* Muestra el mensaje de error si existe */}
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
                                    <p>Appointment was scheduled for {data.calendar}, we will contact you shortly.</p> {/* Mensaje con la fecha programada */}
                                </Modal.Body>

                                <Modal.Footer>
                                    <Button 
                                        variant="dark" 
                                        onClick={() => {
                                            setShowMessage(false); // Oculta el mensaje
                                            setTimeout(() => {
                                                window.location.href = '/propertie/'+house.id; // Redirige a la página de propiedades
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
