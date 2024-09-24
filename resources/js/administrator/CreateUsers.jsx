import React, { useEffect, useState } from "react";  // Importa React y hooks necesarios
import { HeaderAdministrator } from "../components/Administrator/Header";  // Importa el componente del encabezado

export function CreateUsers() {  // Función principal del componente
    const [isSubmitting, setIsSubmitting] = useState(false);  // Estado para controlar el envío del formulario
    const [error, setError] = useState('');  // Estado para manejar errores
    const [token, setToken] = useState('');  // Estado para almacenar el token CSRF

    // Función que maneja el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();  // Evita la recarga de la página

        setIsSubmitting(true);  // Cambia el estado a "enviando"

        const form = document.getElementById('form');  // Obtiene el formulario por su ID

        // Verifica si hay campos vacíos y establece un mensaje de error si es necesario
        if (!form.email.value || !form.password.value || form.role.value === '' || !form.name.value) {
            setError("Fill in the information.");  // Mensaje de error si hay campos vacíos
            return;  // Sale de la función
        }

        const data = new FormData(form);  // Crea un objeto FormData con los datos del formulario
        const action = form.getAttribute('action');  // Obtiene la acción del formulario
        const method = form.getAttribute('method');  // Obtiene el método del formulario

        const headers = new Headers();  // Crea un nuevo objeto Headers
        headers.append('X-CSRF-TOKEN', token);  // Agrega el token CSRF a los encabezados
        headers.append('Accept', 'application/json');  // Indica que se espera una respuesta en formato JSON

        const config = {
            method: method,  // Establece el método HTTP
            headers: headers,  // Establece los encabezados
            mode: "cors",  // Habilita CORS
            cache: 'no-cache',  // Desactiva el caché
            body: data,  // Cuerpo de la solicitud
        }

        // Realiza la solicitud fetch
        fetch(action, config)
            .then(res => res.json())  // Convierte la respuesta a JSON
            .then(res => {
                setIsSubmitting(false);  // Cambia el estado a "no enviando"

                // Manejo de errores basados en el código de estado
                if (res.status === 422) {
                    setError(res.error ? Object.values(res.error).flat()[0] : 'Validation failed.');  // Error de validación
                    return;
                }

                if (res.status === 500) {
                    setError(res.error);  // Error interno del servidor
                    return;
                }

                // Redirige al usuario después de una creación exitosa
                setTimeout(() => {
                    window.location.href = '/dashboard/users';  // Redirige al dashboard de usuarios
                }, 300);
            });
    };

    // Hook para obtener el token CSRF al cargar el componente
    useEffect(() => {
        fetch('/api/csrf-token')  // Realiza una solicitud para obtener el token CSRF
            .then(res => res.json())  // Convierte la respuesta a JSON
            .then(res => {
                setToken(res.csrf_token);  // Almacena el token en el estado
            });
    }, []);

    return (
        <>
            <HeaderAdministrator />  {/* Muestra el encabezado del administrador */}
            <div style={{ width: "100%", padding: "100px 0", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <form method="post" action="/api/users/create" className="form" id="form" onSubmit={handleSubmit}>
                    {/* Titulo de Create */}
                    <div className="title"  style={{ margin:"0" }}>
                        User Creation,
                        <br />
                        <span>
                            Add the info to continue.
                        </span>
                    </div>
                    {/* Campos de entrada para email, nombre y contraseña */}
                    <input
                        style={{ fontWeight: "600", fontFamily: "Arial" }}
                        className="input-visit"
                        name="email"
                        placeholder="Email"
                        type="email"
                        required
                    />
                    <input
                        style={{ fontWeight: "600", fontFamily: "Arial" }}
                        className="input-visit"
                        name="name"
                        placeholder="Name"
                        type="text"
                        required
                    />
                    <input
                        style={{ fontWeight: "600", fontFamily: "Arial" }}
                        className="input-visit"
                        name="password"
                        placeholder="Password"
                        type="password"
                        required
                    />
                    {/* Selección de rol */}
                    <div style={{ width: "100%" }}>
                        <select
                            style={{ fontWeight: "600", fontFamily: "Arial", width: "100%" }}
                            className="input-visit"
                            name="role"
                            defaultValue=""
                            required>
                            <option value="" disabled>Select Role</option>
                            <option value="admin">Administrator</option>
                            <option value="employee">Employee</option>
                        </select>
                    </div>
                    {/* Mensaje de error */}
                    <div style={{ width: '100%', textAlign: 'center', }}>
                        <span style={{ textAlign: "center", fontSize: "13px", color: "red", fontWeight: "600", width: "100%" }}>
                            {error}  {/* Muestra el mensaje de error si existe */}
                        </span>
                    </div>
                    {/* Botón para enviar el formulario */}
                    <button className="button-confirm" type="submit" style={{ margin: "0 auto 0 auto" }} disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Create User→'}  {/* Texto del botón basado en el estado */}
                    </button>
                </form>
            </div>
        </>
    );
}
