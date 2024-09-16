import React, { useEffect, useState } from "react";
import Flatpickr from 'react-flatpickr';
import "flatpickr/dist/themes/material_orange.css"; // Tema base

export function FormVisit({ house }) {
    const [ error, setError ] = useState("");
    

    const handleForm = (e)=>{
        e.preventDefault();
        const form = document.getElementById('formVisit');

        if(!e.target.calendar.value){
            setError("Select the date.");
            return;
        }
        if(!e.target.name.value || !e.target.email.value || !e.target.lastname.value || !e.target.phone.value){
            setError("Fill in the information.");
            return;
        }
        if(!e.target.terms.checked){
            setError("Must accept the terms and conditions.");
            return;
        }

        setError("");

        const data = new FormData(form);
        const method = form.getAttribute('method');
        const action = form.getAttribute('action')
        const encabezado = new Headers();

        const config = {
            method:method,
            header:encabezado,
            mode:"cors",
            cache:'no-cache',
            body:data,
        }

        // fetch(action, config)
        //     .then(res=>res.json())
        //     .then(res=>console.log(res))
    };

    return(
        <div className="Container-form" style={{ padding:"8px" }}>
            <form action={'/api/visit/' + house.id} method="POST" className="formVisit" id="formVisit" onSubmit={handleForm}>
                <h2>
                    Schedule a visit
                </h2>
                <div>
                    <input 
                        placeholder="Name" 
                        className="input-visit" 
                        name="name"
                        id="name" 
                        type="text"
                        required />

                    <input 
                        placeholder="Last Name" 
                        className="input-visit" 
                        name="lastname" 
                        id="lastname"
                        type="text" 
                        required /> 
                </div>
                <div>
                    <input 
                        placeholder="Email address" 
                        className="input-visit" 
                        name="email" 
                        id="email"
                        type="email" 
                        required />
                </div>
                <div>
                    <input 
                        placeholder="Number" 
                        className="input-visit" 
                        type="text" 
                        id="phone" 
                        name="phone" 
                        required />
                </div>
                <div style={{ display:"flex", justifyContent:"center" }}>
                    <Flatpickr 
                        className="input-visit"
                        style={{ width:"200px", height:"35px" }}
                        placeholder="Calendar"
                        name="calendar"
                        id="calendar"
                        options={{ 
                            minDate: "today",
                            maxDate: new Date().fp_incr(120),
                            enableTime: true,
                            dateFormat: "Y-m-d H:i",
                        }}
                        required
                    />
                </div>
                <div>
                    <label className="container-checkbox">
                        <input  
                            type="checkbox" 
                            name="terms"
                            id="terms"
                            required/>
                        <div className="checkmark"></div>
                    </label>
                    <span>Accept Terms and Conditions.</span>

                </div>
                <div>
                    <span style={{ textAlign:"center", fontSize:"12px", color:"red", fontWeight:"600", width:"100%" }}>
                        {
                            error && error
                        }
                    </span>
                </div>
                <div style={{ justifyContent:"center" }}>
                    <button>
                        <span className="button_top"> Send Schedule </span>
                    </button>
                </div>
            </form>
        </div>
    )
}