import React, { useEffect, useState } from "react";  // Importa React y hooks necesarios
import { HeaderAdministrator } from "@/Components/admin/Header";  // Importa el componente del encabezado
import { Head, useForm, router } from '@inertiajs/react'

export default function UpdateUser({ auth, user }) {  // Función principal del componente
    const {data, setData, post, processing, errors, reset} = useForm({
        email : user.email,
        name : user.name,
        password : "",
        role : user.role
    });

    const [ isSubmit, setIsSubmit ] = useState(false);
    const [isSubmittingDelete, setIsSubmittingDelete] = useState(false);

    function submit(e) {
        e.preventDefault();
        setIsSubmit(true);

        post("/dashboard/users/update/"+user.id, {
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

    const setConfirmDelete = () => {
        setIsSubmittingDelete(true)
        if (confirm("Do you want to continue?")) {

            router.delete('/dashboard/users/delete/'+user.id, {
                onSuccess : () => {
                    setIsSubmittingDelete(false);
                    window.location.href = '/dashboard/users';
                },
                onError : () =>{    
                    setIsSubmittingDelete(false);
                },
                onFinish : () =>{    
                    setIsSubmittingDelete(false);
                },
            });
        } else {
            setIsSubmittingDelete(false)
        }
    }

    return (
        <>
            <Head title="Update User" />
                
            <HeaderAdministrator user={auth}/>  {/* Muestra el encabezado del administrador */}
            
            <div style={{ width: "100%", padding: "100px 0", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <form onSubmit={submit} className="form" id="form">
                    {/* Titulo de Create */}
                    <div className="title"  style={{ margin:"0" }}>
                        User Update,
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
                    <input
                        style={{ fontWeight: "600", fontFamily: "Arial" }}
                        className="input-visit"
                        name="role"
                        placeholder="Role"
                        type="text"
                        value={data.role}
                        onChange={e => setData('role', e.target.value)}
                        required
                    />
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
                        {isSubmit ? 'Submitting...' : 'Update User→'}  {/* Texto del botón basado en el estado */}
                    </button>

                    <span 
                        className="button-confirm" 
                        style={{ margin: "0", paddingTop: "5px", textAlign: "center", margin: "0 auto 0 auto" }} 
                        disabled={isSubmittingDelete} 
                        onClick={() => setConfirmDelete(true)}
                    >
                        {isSubmittingDelete ? 'Deleting...' :'Delete User→'}
                    </span>
                </form>
            </div>
        </>
    );
}
