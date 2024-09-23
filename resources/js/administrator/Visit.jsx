import React, { useContext } from "react";
import { HeaderAdministrator } from "../components/Administrator/Header";
import { AuthContext } from "../context/AuthContext";
import { Spinner } from "react-bootstrap";


export function VisitAdministrator({  }) {
    const { user, loginSuccessful } = useContext(AuthContext);

    console.log(user)
    return(
        <>
            {
                loginSuccessful    
                ?<HeaderAdministrator />

                :<div style={{ height:"100vh", width:"100%", display:"flex", justifyContent:"center", alignItems:"center" }}>
                    <Spinner animation="border" />
                </div>
                
            }
        </>
    )
}