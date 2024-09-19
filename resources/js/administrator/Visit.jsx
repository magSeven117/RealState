import React, { useContext } from "react";
import { HeaderAdministrator } from "../components/Administrator/Header";
import { AuthContext } from "../context/AuthContext";



export function VisitAdministrator({  }) {
    const { user, html } = useContext(AuthContext);

    console.log(user)
    return(
        <>
            <HeaderAdministrator />
            Info Visit
        </>
    )
}