import React, { useEffect, useState } from "react";
import { HeaderAdministrator } from "../components/Administrator/Header";



export function CreateUsers({  }) {
    const [ isSubmitting, setIsSubmitting ] = useState(false);
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

    };

    useEffect(()=>{
        fetch('/api/csrf-token')
            .then(res=>res.json())
            .then(res=>{
                setToken(res.csrf_token);
            })
    },[])

    return(
        <>
            <HeaderAdministrator />
            <div style={{ width: "100%", padding: "100px 0", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <form method="post" action="/api/users/create" className="form" id="form" onSubmit={handleSubmit}>
                    <div className="title">
                        User Creation,
                        <br />
                        <span>
                            Add the info to continue.
                        </span>
                    </div>
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
                    <div style={{ width:"100%" }}>
                        <select 
                        style={{ fontWeight: "600", fontFamily: "Arial", width:"100%" }}
                        className="input-visit"
                        name="role"
                        defaultValue=""
                        required>
                            <option value="" disabled>Select Role</option>
                            <option value="admin">Administrator</option>
                            <option value="employee">employee</option>
                        </select>
                    </div>
                    <div style={{ width: '100%', textAlign: 'center', }}>
                        <span style={{ textAlign: "center", fontSize: "13px", color: "red", fontWeight: "600", width: "100%" }}>
                            {error}
                        </span>
                    </div>
                    <button className="button-confirm" type="submit" style={{ margin:"0 auto 0 auto" }} disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' :'Create User→'}
                    </button>
                </form>
            </div>
        </>
    )
}