import React, { useContext, useEffect, useState } from "react";
import { HeaderAdministrator } from "../components/Administrator/Header";
import { AuthContext } from "../context/AuthContext";
import Table from 'react-bootstrap/Table';

export function UsersAdministrator({  }) {
    const { user, html } = useContext(AuthContext);
    const [ data, setData ] = useState()
    useEffect(()=>{
        fetch('/api/users/alls')
            .then(res=>res.json())
            .then(res=>{
                if(res.status == 200)
                    setData(res);
            })
    },[])
    return(
        <>
            <HeaderAdministrator />

            <div style={{ marginTop:"30px", padding:"0 30px" }}>
                <div style={{ textAlign:"center", width:"100%" }}>
                    <h1>Users</h1>
                </div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td colSpan={2}>Larry the Bird</td>
                            <td>@twitter</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
            
        </>
    )
}