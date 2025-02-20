import React, { useEffect, useState } from "react";  // Importa React y hooks necesarios
import { HeaderAdministrator } from "@/Components/admin/Header";  // Importa el componente del encabezado
import { Head, useForm } from '@inertiajs/react'

export default function CreateUser({ auth }) {  // Función principal del componente
    const {data, setData, post, processing, errors, reset} = useForm({
        email : "",
        name : "",
        password : "",
        role : ""
    });

    const [ isSubmit, setIsSubmit ] = useState(false);

    function submit(e) {
        e.preventDefault();
        setIsSubmit(true);

        post("/dashboard/users/create", {
            onSuccess : () => {
                setIsSubmit(false);
                window.location.href = '/dashboard/users';
            },
            onError : () =>{    
                setIsSubmit(false);
            },
            onFinish : () =>{    
                setIsSubmit(false);
            },
        });
    } 

    return (
        <>
            <Head title="Create User" />
                
            <HeaderAdministrator user={auth}/>  {/* Muestra el encabezado del administrador */}
            
            <div style={{ width: "100%", padding: "100px 0", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <form onSubmit={submit} className="form" id="form">
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
                        value={data.email}
                        onChange={e => setData('email', e.target.value)}
                        required
                    />
                    {/* Mensaje de error */}
                    <div style={{ width: '100%', textAlign: 'center', }}>
                        {
                            errors.email 
                            &&<span style={{ textAlign: "center", fontSize: "13px", color: "red", fontWeight: "600", width: "100%" }}>
                                { errors.email }  
                            </span>
                        }
                    </div>

                    <input
                        style={{ fontWeight: "600", fontFamily: "Arial" }}
                        className="input-visit"
                        name="name"
                        placeholder="Name"
                        type="text"
                        value={data.name}
                        onChange={e => setData('name', e.target.value)}
                        required
                    />
                    {/* Mensaje de error */}
                    <div style={{ width: '100%', textAlign: 'center', }}>
                        {
                            errors.name 
                            &&<span style={{ textAlign: "center", fontSize: "13px", color: "red", fontWeight: "600", width: "100%" }}>
                                { errors.name }  
                            </span>
                        }
                    </div>

                    <input
                        style={{ fontWeight: "600", fontFamily: "Arial" }}
                        className="input-visit"
                        name="password"
                        placeholder="Password"
                        type="password"
                        value={data.password}
                        onChange={e => setData('password', e.target.value)}
                        required
                    />
                    {/* Mensaje de error */}
                    <div style={{ width: '100%', textAlign: 'center', }}>
                        {
                            errors.password 
                            &&<span style={{ textAlign: "center", fontSize: "13px", color: "red", fontWeight: "600", width: "100%" }}>
                                { errors.password }  
                            </span>
                        }
                    </div>

                    {/* Selección de rol */}
                    <div style={{ width: "100%" }}>
                        <select
                            style={{ fontWeight: "600", fontFamily: "Arial", width: "100%" }}
                            className="input-visit"
                            name="role"
                            defaultValue=""
                            value={data.role}
                            onChange={e => setData('role', e.target.value)}
                            required>
                            <option value="" disabled>Select Role</option>
                            <option value="admin">Administrator</option>
                            <option value="employee">Employee</option>
                        </select>
                    </div>
                    {/* Mensaje de error */}
                    <div style={{ width: '100%', textAlign: 'center', }}>
                        {
                            errors.role 
                            &&<span style={{ textAlign: "center", fontSize: "13px", color: "red", fontWeight: "600", width: "100%" }}>
                                { errors.role }  
                            </span>
                        }
                    </div>
                    
                    {/* Botón para enviar el formulario */}
                    <button className="button-confirm" type="submit" style={{ margin: "0 auto 0 auto" }} disabled={isSubmit}>
                        {isSubmit ? 'Submitting...' : 'Create User→'}  {/* Texto del botón basado en el estado */}
                    </button>
                </form>
            </div>
        </>
    );
}
