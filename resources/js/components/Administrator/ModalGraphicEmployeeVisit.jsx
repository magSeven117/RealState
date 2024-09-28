import React, { useEffect, useState } from "react";
import { Button, Spinner, Table } from "react-bootstrap";
import { Link } from "react-router-dom";


export function ModalGraphicEmployeeVisit() {
    const [ user, setUser ] = useState();
    const [ visit, setVisit ] = useState();

    useEffect(()=>{
        fetch('/api/users/?limit=4&role=employee')
            .then(res=>res.json())
            .then(res=>{
                if(res.status === 200)
                    setUser(res.data);
            })
        
        fetch('/api/visit/?pending_visit=true&limit=4')
            .then(res=>res.json())
            .then(res=>{
                if(res.status === 200)
                    setVisit(res.data);
            })
    }, [])


    return (
        <div className="content-graphic">
            {/* visitas urgentes */}
            <div style={{ height:"280px", width:"100%", padding:"0 10px" }}>
                <h5 style={{ width:"100%", textAlign:"center" }}>
                Scheduled Visits Needing Immediate Attention
                </h5>
                {   visit
                    ?<Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>phone</th>
                            <th>visualise</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Soporta solo 4 componentes */}
                        
                        {   
                            visit.length != 0 
                            ? visit.map(item=>{
                                return(
                                    <tr key={item.name}>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.phone}</td>
                                        <td>
                                            <Link>
                                                <Button variant="secondary" style={{ width:"100%", padding:"0px 0" }}>View</Button>
                                            </Link>
                                        </td>
                                    </tr>
                                )
                            })
                            : <tr>
                                <td colSpan={4} style={{ textAlign:"center" }}>No visits pending.</td>
                            </tr>
                        }
                        
                    </tbody>
                    </Table>
                    : <div style={{ height:"100%", width:"100%", display:"flex", justifyContent:"center", alignItems:"center" }}>
                        <Spinner animation="border" />
                    </div>
                }
            </div>

            {/* Empleados */}
            <div style={{ height:"280px", width:"100%", padding:"0 10px" }}>
                <h5 style={{ width:"100%", textAlign:"center" }}>
                    Scheduled Visits Needing Immediate Attention
                </h5>
                {
                    user
                    ?<Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>email</th>
                                <th>Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Soporta solo 4 componentes */}
                            {
                                user.length != 0 
                                ? user.map(item=>{
                                    return(
                                        <tr key={item.name}>
                                            <td>{item.name}</td>
                                            <td>{item.email}</td>
                                            <td>{item.role}</td>
                                        </tr>
                                    )
                                })
                                : <tr>
                                    <td colSpan={3} style={{ textAlign:"center" }}>No employees.</td>
                                </tr>
                            }
                            
                        </tbody>
                    </Table>
                    
                    :<div style={{ height:"100%", width:"100%", display:"flex", justifyContent:"center", alignItems:"center" }}>
                        <Spinner animation="border" />
                    </div>
                }
            </div>
        </div> 
    )
}