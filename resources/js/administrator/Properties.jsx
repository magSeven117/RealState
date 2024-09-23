import React, { useContext, useEffect, useState } from "react";
import { HeaderAdministrator } from "../components/Administrator/Header";
import { AuthContext } from "../context/AuthContext";
import { Spinner } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";


export function PropertiesAdministrator({  }) {
    const { loginSuccessful } = useContext(AuthContext);
    const [ properties, setProperties ] = useState();
    

    useEffect(()=>{
        fetch('/api/houses')
            .then(res=>res.json())
            .then(res=>{
                setProperties(res.data)
                console.log(res)
            })
    }, [])
    
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
                                    <th>Photo</th>
                                    <th>Address</th>
                                    <th>Status</th>
                                    <th>Modify</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    properties && properties.map((item)=>{
                                        return(
                                            <tr key={item.id}>
                                                <td style={{ textAlign:"center", width:"10px" }}>{item.id}</td>
                                                <td style={{ width:"50px" }}>
                                                    <img src={item.images[0]} alt={"house"+item.id} style={{ width:"70px" }}/>
                                                </td>
                                                <td>
                                                    {item.address}
                                                </td>
                                                <td>
                                                    <span>Public</span>
                                                </td>

                                                <td style={{ width: '50px' }}>
                                                    <Link to={'/dashboard/properties/modify/'+item.id} style={{ width:"min-content" }}>
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
                            <Link to={'/dashboard/properties/create'}>
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