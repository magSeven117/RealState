import React, { useEffect, useState } from "react";;
import { Link } from "react-router-dom";
import { CancelButton } from "../components/ImageAssets";

export function LoginAdministrator(params) {
    const [error, setError] = useState("");
    const [token, setToken] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false); 

    useEffect(() => {
        fetch('/api/csrf-token')
            .then(res => res.json())
            .then(res => {
                setToken(res.csrf_token);
            })
            .catch(err => console.log(err));
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();

        const form = e.target;

        if (!form.email.value || !form.password.value) {
            setError("Fill in the information.");
            return;
        }

        setError("");
        setIsSubmitting(true);

        const data = new FormData(form);
        const method = form.getAttribute('method');
        const action = form.getAttribute('action');

        const headers = new Headers();
        headers.append('X-CSRF-TOKEN', token);
        headers.append('Accept', 'application/json');

        const config = {
            method: method,
            headers: headers,
            mode: "cors",
            cache: 'no-cache',
            body: data,
        };

        fetch(action, config)
            .then(res => res.json())
            .then(res => {
                setIsSubmitting(false);
                if (res.status === 422) {
                    setError(res.errors ? Object.values(res.errors).flat().join(', ') : 'Validation failed.');
                } else if (res.status === 403) {
                    setError("Please, leave this page.");
                    
                    setTimeout(() => {
                        window.location.href = '/'
                    }, 300);
                } else {
                    setTimeout(() => {
                        window.location.href = res.url;
                    }, 300);
                }
            })
            .catch(err => {
                setIsSubmitting(false);
                setError("An unexpected error occurred.");
                console.log(err);
            });
    };

    return (
        <>
            <Link to={'/'} style={{ position:"absolute", top: "5px", left: "5px", cursor: "pointer", color: "#000" }}>
                <CancelButton  style={{ width:"30px" }}/>
            </Link>
            <div style={{ width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <div style={{ maxHeight:"400px" }}>
                    <form method="post" action="/api/login" className="form" id="form" onSubmit={handleLogin}>
                        <div className="title">
                            Welcome,
                            <br />
                            <span>
                                sign up to continue
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
                            name="password"
                            placeholder="Password"
                            type="password"
                            required
                        />
                        <div style={{ width: '100%', textAlign: 'center', }}>
                            <span style={{ textAlign: "center", fontSize: "13px", color: "red", fontWeight: "600", width: "100%" }}>
                                {error}
                            </span>
                        </div>
                        <button className="button-confirm" type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Submitting...' : 'Let’s go →'}
                        </button>
                    </form>
                </div>
                
            </div>
        </>
    );
}