import React, { useEffect, useState } from "react";
import { HeaderAdministrator } from "../components/Administrator/Header";
import { useParams } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';
import { ModalConfirmAlert } from "../components/Administrator/ModalConfirmAlert";

export function ModifyUsers({  }) {
    const { id } = useParams();
    const [ user, setUser ] = useState();
    const [ isSubmitting, setIsSubmitting ] = useState(false);
    const [ isSubmittingDelete, setIsSubmittingDelete ] = useState(false);
    const [ confirmDelete, setConfirmDelete ] = useState(false);
    const [ error, setError ] = useState('');
    const [ token, setToken ] = useState('');

    const handleSubmit = (e)=>{
        e.preventDefault();

        setIsSubmitting(true);

        const form = document.getElementById('form');

        if (!form.email.value || !form.password.value || form.role.value == '' || !form.name.value) {
            setError("Fill in the information.");
            return;
        }

        const data = new FormData(form);
        const action = form.getAttribute('action');
        const method = form.getAttribute('method');

        const headers = new Headers();
        headers.append('X-CSRF-TOKEN', token);
        headers.append('Accept', 'application/json');

        const config = {
            method: method,
            headers: headers,
            mode: "cors",
            cache: 'no-cache',
            body: data,
        }

        fetch(action, config)
            .then(res=> res.json())
            .then(res=> {
                setIsSubmitting(false); 

                if(res.status === 422){
                    setError(res.errors ? Object.values(res.errors).flat().join(', ') : 'Validation failed.');
                    return;
                }

                if(res.status === 500){
                    setError(res.error);
                    return;
                }

                setTimeout(() => {
                    window.location.href = '/dashboard/users';
                }, 300);
            })
            .catch(e=>{
                setIsSubmitting(false);
                setError('An unexpected error occurred.');
            })

    };

    const handleSubmitDelete = ()=>{
        setIsSubmittingDelete(true);
        setConfirmDelete(false);

        const headers = new Headers();
        headers.append('X-CSRF-TOKEN', token);
        headers.append('Accept', 'application/json');

        const config = {
            method: 'DELETE',
            headers: headers,
            mode: "cors",
            cache: 'no-cache',
        }

        fetch("/api/users/delete/"+id, config)
            .then(res=> res.json())
            .then(res=> {
                setIsSubmittingDelete(false);
                
                if(res.status === 404){
                    setError(res.error);
                    return;
                }

                if(res.status === 500){
                    setError(res.error);
                    return;
                }

                setTimeout(() => {
                    window.location.href = '/dashboard/users';
                }, 300);
            })
            .catch(e=>{
                setIsSubmittingDelete(false);
                setError('An unexpected error occurred.');
            })

    };

    useEffect(()=>{
        fetch('/api/csrf-token')
            .then(res=>res.json())
            .then(res=>{
                console.log(res)
                setToken(res.csrf_token);
            })
        
        fetch('/api/users/?id='+id)
            .then(res=>res.json())
            .then(res=>{
                setUser(res.data)
            })
    },[id])
    
    return(
        <>
            <HeaderAdministrator />
            <div style={{ width: "100%", padding: "100px 0", display: "flex", justifyContent: "center", alignItems: "center" }}>
                {
                    user
                    ? <form method="post" action={"/api/users/update/"+id} className="form" id="form" onSubmit={handleSubmit}>
                        <div className="title">
                            Modify Use,
                            <br />
                            <span>
                                Modify the info to continue.
                            </span>
                        </div>
                        <input
                            style={{ fontWeight: "600", fontFamily: "Arial" }}
                            className="input-visit"
                            name="email"
                            placeholder="Email"
                            type="email"
                            defaultValue={user.email}
                            required
                        />
                        <input
                            style={{ fontWeight: "600", fontFamily: "Arial" }}
                            className="input-visit"
                            name="name"
                            placeholder="Name"
                            type="text"
                            defaultValue={user.name}
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
                        <input
                            style={{ fontWeight: "600", fontFamily: "Arial" }}
                            className="input-visit"
                            name="password_confirmation"
                            placeholder="Confirm Password"
                            type="password"
                            required
                        />
                        <div style={{ width:"100%" }}>
                            <select 
                            style={{ fontWeight: "600", fontFamily: "Arial", width:"100%" }}
                            className="input-visit"
                            name="role"
                            defaultValue={user.role}
                            required>
                                <option value="admin">Administrator</option>
                                <option value="employee">employee</option>
                            </select>
                        </div>
                        <div style={{ width: '100%', textAlign: 'center', }}>
                            <span style={{ textAlign: "center", fontSize: "13px", color: "red", fontWeight: "600", width: "100%" }}>
                                {error}
                            </span>
                        </div>
                        <div style={{ width:"100%", display:"flex", justifyContent:"space-between" }}>
                            <span className="button-confirm" style={{ margin:"0", paddingTop:"5px", textAlign:"center" }} disabled={isSubmittingDelete} onClick={()=>setConfirmDelete(true)}>
                                {isSubmittingDelete ? 'Submitting...' :'Delete User→'}
                            </span>

                            <button className="button-confirm" type="submit" style={{ margin:"0" }} disabled={isSubmitting}>
                                {isSubmitting ? 'Submitting...' :'Modify User→'}
                            </button>
                        </div>
                    </form>

                    : <Spinner animation="border" />
                }
                
            </div>

            {
                confirmDelete && <ModalConfirmAlert 
                    title={'Delete user'}
                    subtitle={'You are about to delete this user, do you want to continue?.'}
                    button={'Delete'}
                    typeButton={'danger'}
                    functionButton={()=>{
                        handleSubmitDelete();
                    }} />
            }
            
        </>
    )
}