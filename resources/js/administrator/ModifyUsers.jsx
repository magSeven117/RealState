import React, { useEffect, useState } from "react"; // Importamos React y hooks
import { HeaderAdministrator } from "../components/Administrator/Header"; // Encabezado del administrador
import { useParams } from "react-router-dom"; // Para acceder a los parámetros de la URL
import Spinner from 'react-bootstrap/Spinner'; // Spinner de react-bootstrap para mostrar carga
import { ModalConfirmAlert } from "../components/Administrator/ModalConfirmAlert"; // Componente para confirmar eliminación

export function ModifyUsers() {
    const { id } = useParams(); // Obtenemos el ID del usuario desde los parámetros de la URL
    const [user, setUser] = useState(); // Estado para almacenar la información del usuario
    const [isSubmitting, setIsSubmitting] = useState(false); // Estado para manejar el envío del formulario
    const [isSubmittingDelete, setIsSubmittingDelete] = useState(false); // Estado para manejar el envío de eliminación
    const [confirmDelete, setConfirmDelete] = useState(false); // Estado para manejar la confirmación de eliminación
    const [error, setError] = useState(''); // Estado para almacenar mensajes de error
    const [token, setToken] = useState(''); // Estado para almacenar el token CSRF

    // Función para manejar el envío del formulario de modificación
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
        setIsSubmitting(true); // Indicar que se está enviando el formulario

        const form = document.getElementById('form'); // Obtener el formulario

        // Validar que todos los campos requeridos estén llenos
        if (!form.email.value || !form.password.value || form.role.value === '' || !form.name.value) {
            setError("Fill in the information.");
            return;
        }

        const data = new FormData(form); // Crear un objeto FormData con los datos del formulario
        const action = form.getAttribute('action'); // Obtener la acción del formulario
        const method = form.getAttribute('method'); // Obtener el método del formulario

        // Configurar los encabezados para la solicitud
        const headers = new Headers();
        headers.append('X-CSRF-TOKEN', token);
        headers.append('Accept', 'application/json');

        const config = {
            method: method, // Método de la solicitud
            headers: headers, // Encabezados configurados
            mode: "cors", // Modo de la solicitud
            cache: 'no-cache', // Sin caché
            body: data, // Datos del formulario
        };

        fetch(action, config) // Hacer la solicitud
            .then(res => res.json())
            .then(res => {
                setIsSubmitting(false); // Indicar que se ha completado el envío

                if (res.status === 422) {
                    // Manejar error de validación
                    setError(res.error ? Object.values(res.error).flat()[0] : 'Validation failed.');
                    return;
                }

                if (res.status === 500) {
                    // Manejar error interno del servidor
                    setError(res.error);
                    return;
                }

                // Redirigir a la lista de usuarios después de un retraso
                setTimeout(() => {
                    window.location.href = '/dashboard/users';
                }, 300);
            })
            .catch(e => {
                setIsSubmitting(false); // Indicar que se ha completado el envío
                setError('An unexpected error occurred.'); // Manejo de errores inesperados
            });
    };

    // Función para manejar la eliminación del usuario
    const handleSubmitDelete = () => {
        setIsSubmittingDelete(true); // Indicar que se está enviando la solicitud de eliminación
        setConfirmDelete(false); // Cerrar la confirmación de eliminación

        // Configurar los encabezados para la solicitud de eliminación
        const headers = new Headers();
        headers.append('X-CSRF-TOKEN', token);
        headers.append('Accept', 'application/json');

        const config = {
            method: 'DELETE', // Método de la solicitud
            headers: headers, // Encabezados configurados
            mode: "cors", // Modo de la solicitud
            cache: 'no-cache', // Sin caché
        };

        fetch("/api/users/delete/" + id, config) // Hacer la solicitud de eliminación
            .then(res => res.json())
            .then(res => {
                setIsSubmittingDelete(false); // Indicar que se ha completado el envío

                if (res.status === 404) {
                    // Manejar error si el usuario no se encuentra
                    setError(res.error);
                    return;
                }

                if (res.status === 500) {
                    // Manejar error interno del servidor
                    setError(res.error);
                    return;
                }

                // Redirigir a la lista de usuarios después de un retraso
                setTimeout(() => {
                    window.location.href = '/dashboard/users';
                }, 300);
            })
            .catch(e => {
                setIsSubmittingDelete(false); // Indicar que se ha completado el envío
                setError('An unexpected error occurred.'); // Manejo de errores inesperados
            });
    };

    // useEffect para obtener el token CSRF y la información del usuario
    useEffect(() => {
        fetch('/api/csrf-token') // Obtener el token CSRF
            .then(res => res.json())
            .then(res => {
                setToken(res.csrf_token); // Almacenar el token en el estado
            });

        fetch('/api/users/?id=' + id) // Obtener la información del usuario
            .then(res => res.json())
            .then(res => {
                setUser(res.data); // Almacenar los datos del usuario en el estado
            });
    }, [id]);

    return (
    <>
        {/* Componente de encabezado para la vista del administrador */}
        <HeaderAdministrator />

        {/* Contenedor principal que centra el formulario de modificación de usuario */}
        <div style={{ width: "100%", padding: "100px 0", display: "flex", justifyContent: "center", alignItems: "center" }}>
            {
                // Verifica si hay datos del usuario para mostrar el formulario
                user
                ? (
                    // Formulario para modificar la información del usuario
                    <form method="post" action={"/api/users/update/"+id} className="form" id="form" onSubmit={handleSubmit}>
                        {/* Titulo de Modify */}
                        <div className="title" style={{ margin:"0" }}>
                            Modify User,
                            <br />
                            <span>
                                Modify the info to continue.
                            </span>
                        </div>
                        {/* Campo para el email del usuario */}
                        <input
                            style={{ fontWeight: "600", fontFamily: "Arial" }}
                            className="input-visit"
                            name="email"
                            placeholder="Email"
                            type="email"
                            defaultValue={user.email}
                            required
                        />
                        {/* Campo para el nombre del usuario */}
                        <input
                            style={{ fontWeight: "600", fontFamily: "Arial" }}
                            className="input-visit"
                            name="name"
                            placeholder="Name"
                            type="text"
                            defaultValue={user.name}
                            required
                        />
                        {/* Campo para la contraseña del usuario */}
                        <input
                            style={{ fontWeight: "600", fontFamily: "Arial" }}
                            className="input-visit"
                            name="password"
                            placeholder="Password"
                            type="password"
                            required
                        />
                        {/* Campo para confirmar la contraseña del usuario */}
                        <input
                            style={{ fontWeight: "600", fontFamily: "Arial" }}
                            className="input-visit"
                            name="password_confirmation"
                            placeholder="Confirm Password"
                            type="password"
                            required
                        />
                        {/* Selector para elegir el rol del usuario */}
                        <div style={{ width: "100%" }}>
                            <select 
                                style={{ fontWeight: "600", fontFamily: "Arial", width: "100%" }}
                                className="input-visit"
                                name="role"
                                defaultValue={user.role}
                                required
                            >
                                <option value="admin">Administrator</option>
                                <option value="employee">Employee</option>
                            </select>
                        </div>
                        {/* Mensaje de error en caso de que ocurra algún problema */}
                        <div style={{ width: '100%', textAlign: 'center', }}>
                            <span style={{ textAlign: "center", fontSize: "13px", color: "red", fontWeight: "600", width: "100%" }}>
                                {error}
                            </span>
                        </div>
                        {/* Contenedor para los botones de modificar y eliminar usuario */}
                        <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                            {/* Botón para eliminar el usuario */}
                            <span 
                                className="button-confirm" 
                                style={{ margin: "0", paddingTop: "5px", textAlign: "center" }} 
                                disabled={isSubmittingDelete} 
                                onClick={() => setConfirmDelete(true)}
                            >
                                {isSubmittingDelete ? 'Deleting...' :'Delete User→'}
                            </span>
                            {/* Botón para enviar el formulario y modificar el usuario */}
                            <button 
                                className="button-confirm" 
                                type="submit" 
                                style={{ margin: "0" }} 
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Submitting...' :'Modify User→'}
                            </button>
                        </div>
                    </form>
                )
                : (
                    // Spinner que se muestra mientras se cargan los datos del usuario
                    <Spinner animation="border" />
                )
            }
        </div>

        {/* Modal que se muestra al confirmar la eliminación del usuario */}
        {
            confirmDelete && (
                <ModalConfirmAlert 
                    title={'Delete user'}
                    subtitle={'You are about to delete this user, do you want to continue?.'}
                    button={'Delete'}
                    typeButton={'danger'}
                    functionButton={() => {
                        handleSubmitDelete(); // Llama a la función para eliminar al usuario
                    }} 
                />
            )
        }
    </>
);
}