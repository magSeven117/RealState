import { React, useState } from "react"; // Importa React y hooks
import Flatpickr from 'react-flatpickr'; // Importa el componente Flatpickr para selección de fechas
import "flatpickr/dist/themes/material_orange.css"; // Importa el tema de Flatpickr
import Button from 'react-bootstrap/Button'; // Importa el componente Button de React Bootstrap
import Modal from 'react-bootstrap/Modal'; // Importa el componente Modal de React Bootstrap
import { useForm } from "@inertiajs/react";

export function FormVisit({ house }) {
    // Estado para manejar mensajes de error, visibilidad del mensaje y la fecha programada
    const [ showMessage, setShowMessage ] = useState(false);
    const { data, setData, post, errors } = useForm({
        nombre: "",
        apellido: "",
        correo: "",
        telefono: "",
        calendario: "",
        terminos: false,
    });

    // Función que maneja el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault(); // Previene el comportamiento por defecto del formulario
        post(`/visita/${house.id}`, {
            onSuccess: () => setShowMessage(true),
        });
    };

    return (
        <div className="container-form" style={{ padding: "16px", maxWidth: "500px", margin: "auto" }}>
            <form className="form-visit" id="formVisit" onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <h2 style={{ textAlign: "center", color: "#333" }}>Agendar una visita</h2>
                
                {/* Input Nombre y Apellido */}
                <div style={{ display: "flex", gap: "8px" }}>
                    <input 
                        placeholder="Nombre" 
                        className="input-visit" 
                        name="nombre"
                        onChange={e => setData('nombre', e.target.value)}
                        value={data.nombre}
                        id="nombre" 
                        type="text"
                        required
                        style={{ flex: 1 }}
                    />
                    <input 
                        placeholder="Apellido" 
                        className="input-visit" 
                        name="apellido"
                        onChange={e => setData('apellido', e.target.value)}
                        value={data.apellido} 
                        id="apellido"
                        type="text" 
                        required
                        style={{ flex: 1 }}
                    />
                </div>
                {errors.nombre || errors.apellido && <span className="error-text">{errors.nombre || errors.apellido}</span>}
                
                {/* Input Correo */}
                <input 
                    placeholder="Correo electrónico" 
                    className="input-visit" 
                    name="correo" 
                    id="correo"
                    onChange={e => setData('correo', e.target.value)}
                    value={data.correo} 
                    type="email" 
                    required
                />
                {errors.correo && <span className="error-text">{errors.correo}</span>}
                
                {/* Input Teléfono */}
                <input 
                    placeholder="Teléfono" 
                    className="input-visit" 
                    type="text" 
                    id="telefono" 
                    onChange={e => setData('telefono', e.target.value)}
                    value={data.telefono} 
                    name="telefono" 
                    required
                />
                {errors.telefono && <span className="error-text">{errors.telefono}</span>}
                
                {/* Input Calendario */}
                <Flatpickr 
                    className="input-visit"
                    placeholder="Seleccione fecha y hora"
                    name="calendario"
                    id="calendario"
                    options={{ 
                        minDate: "today", 
                        maxDate: new Date().fp_incr(120), 
                        enableTime: true, 
                        dateFormat: "Y-m-d H:i", 
                    }}
                    onChange={(selectedDates, dateStr) => setData("calendario", dateStr)}
                    required
                />
                {errors.calendario && <span className="error-text">{errors.calendario}</span>}
                
                {/* Checkbox Términos */}
                <label className="container-checkbox" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <input  
                        type="checkbox" 
                        name="terminos"
                        id="terminos"
                        onChange={e => setData('terminos', e.target.checked)}
                        checked={data.terminos} 
                        required
                    />
                    <span>Acepto los términos y condiciones</span>
                </label>
                {errors.terminos && <span className="error-text">{errors.terminos}</span>}
                
                {/* Botón de envío */}
                <button type="submit" className="submit-button" style={{ backgroundColor: "#ff6600", color: "white", padding: "10px", borderRadius: "5px", cursor: "pointer", border: "none", fontSize: "16px" }}>
                    <span className="button_top">Enviar solicitud</span>
                </button>
            </form>
        </div>
    );
}
