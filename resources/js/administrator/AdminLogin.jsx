import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CancelButton } from "../components/ImageAssets";

export function LoginAdministrator() {
    // Estado para manejar el error, el token CSRF y el estado de envío
    const [error, setError] = useState("");
    const [token, setToken] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false); 

    // useEffect para obtener el token CSRF al montar el componente
    useEffect(() => {
        fetch('/api/csrf-token')
            .then(res => res.json())
            .then(res => {
                setToken(res.csrf_token); // Guardamos el token CSRF en el estado
            })
            .catch(err => console.log(err)); // Manejo de errores al obtener el token
    }, []);

    // Función para manejar el inicio de sesión
    const handleLogin = (e) => {
        e.preventDefault(); // Previene el comportamiento por defecto del formulario

        const form = e.target; // Obtenemos el formulario

        // Validación de los campos requeridos
        if (!form.email.value || !form.password.value) {
            setError("Fill in the information.");
            return; // Si falta información, no continuamos
        }

        setError(""); // Reseteamos el mensaje de error
        setIsSubmitting(true); // Indicamos que estamos en proceso de envío

        const data = new FormData(form); // Creamos un objeto FormData con los datos del formulario
        const method = form.getAttribute('method'); // Obtenemos el método del formulario
        const action = form.getAttribute('action'); // Obtenemos la acción del formulario

        // Configuración de los headers para la solicitud
        const headers = new Headers();
        headers.append('X-CSRF-TOKEN', token); // Agregamos el token CSRF
        headers.append('Accept', 'application/json'); // Indicamos que aceptamos JSON

        const config = {
            method: method,
            headers: headers,
            mode: "cors", // Activamos CORS
            cache: 'no-cache', // Desactivamos la caché
            body: data, // Enviamos los datos del formulario
        };

        // Realizamos la solicitud de inicio de sesión
        fetch(action, config)
            .then(res => res.json())
            .then(res => {
                setIsSubmitting(false); // Indicamos que hemos terminado de enviar
                // Manejo de diferentes estados de respuesta
                if (res.status === 422) {
                    // Validación fallida
                    setError(res.errors ? Object.values(res.errors).flat().join(', ') : 'Validation failed.');
                } else if (res.status === 403) {
                    // Acceso prohibido
                    setError("Please, leave this page.");
                    setTimeout(() => {
                        window.location.href = '/'; // Redirigimos al inicio después de 300 ms
                    }, 300);
                } else {
                    // Inicio de sesión exitoso
                    setTimeout(() => {
                        window.location.href = res.url; // Redirigimos a la URL de destino
                    }, 300);
                }
            })
            .catch(err => {
                setIsSubmitting(false); // En caso de error, terminamos el estado de envío
                setError("An unexpected error occurred."); // Establecemos un mensaje de error
                console.log(err); // Mostramos el error en la consola
            });
    };

    return (
        <>
            <Link to={'/'} style={{ position: "absolute", top: "5px", left: "5px", cursor: "pointer", color: "#000" }}>
                <CancelButton style={{ width: "30px" }} /> {/* Botón para cancelar */}
            </Link>
            <div style={{ width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <div style={{ maxHeight: "400px" }}>
                    <form method="post" action="/api/login" className="form" id="form" onSubmit={handleLogin}>
                        <div className="title">
                            Welcome,
                            <br />
                            <span>
                                sign up to continue
                            </span>
                        </div>
                        {/* Campo para el email */}
                        <input
                            style={{ fontWeight: "600", fontFamily: "Arial" }}
                            className="input-visit"
                            name="email"
                            placeholder="Email"
                            type="email"
                            required
                        />
                        {/* Campo para la contraseña */}
                        <input
                            style={{ fontWeight: "600", fontFamily: "Arial" }}
                            className="input-visit"
                            name="password"
                            placeholder="Password"
                            type="password"
                            required
                        />
                        <div style={{ width: '100%', textAlign: 'center' }}>
                            {/* Mensaje de error */}
                            <span style={{ textAlign: "center", fontSize: "13px", color: "red", fontWeight: "600", width: "100%" }}>
                                {error}
                            </span>
                        </div>
                        {/* Botón para enviar el formulario */}
                        <button className="button-confirm" type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Submitting...' : 'Let’s go →'}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
