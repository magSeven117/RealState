import React, { useContext, useEffect, useState } from "react";
import { HeaderAdministrator } from "../components/Administrator/Header";
import { AuthContext } from "../context/AuthContext";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import { Spinner } from "react-bootstrap";

export function UsersAdministrator({  }) {
    const { user, loginSuccessful } = useContext(AuthContext);
    const [ data, setData ] = useState();

    useEffect(()=>{
        fetch('/api/users')
            .then(res=>res.json())
            .then(res=>{
                if(res.status == 200)
                    setData(res.data);
            })
    },[])
    return(
        <>
            {
                loginSuccessful
                ?
                <>
                    <HeaderAdministrator />
                    <div style={{ marginTop:"30px", padding:"0 10px" }}>
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
                                    <th>Modify</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    data && data.map((item)=>{
                                        return(
                                            <tr key={item.id}>
                                                <td style={{ textAlign:"center", width:"10px" }}>{item.id}</td>
                                                <td>{item.name}</td>
                                                <td>{item.email}</td>
                                                <td>{item.role}</td>

                                                <td style={{ width: '50px' }}>
                                                    <Link to={'/dashboard/users/modify/'+item.id} style={{ width:"min-content" }}>
                                                        <Button variant="warning">Modify</Button>
                                                    </Link> 
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </Table>

                        <div style={{ display:"flex", width:"100%", justifyContent:"center", marginTop:"20px" }}>
                            <Link to={'/dashboard/users/create'}>
                                <Button variant="primary">Add User</Button>
                            </Link>
                        </div>
                    </div>
                </> 


                :
                <div style={{ height:"100vh", width:"100%", display:"flex", justifyContent:"center", alignItems:"center" }}>
                    <Spinner animation="border" />
                </div>
            }
            
            
        </>
    )
}