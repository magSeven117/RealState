import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { HeaderAdministrator } from "../components/Administrator/Header";

export function Dashboard({  }) {
    const {user, html} = useContext(AuthContext);

    console.log(user)
    return (
        <>
            <HeaderAdministrator />
            Home
        </>
    )
}