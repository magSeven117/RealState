import React, { useEffect, useState } from "react";
import { Button, Spinner, Table } from "react-bootstrap";
import { Link } from "react-router-dom";


export function ModalTablePropertiesCreated() {
    const [ house, setHouse ] = useState();

    useEffect(()=>{
        fetch('/api/houses?limit=3&orderBy=desc')
            .then(res=>res.json())
            .then(res=>{
                if(res.status === 200)
                    setHouse(res.data);
            })
    }, [])

    return (
        <div className="content-properties">
            <h5 style={{ width:"100%", textAlign:"center" }}>Latest properties created</h5>
            
            {
                house 
                ?<Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Photo</th>
                        <th>Address</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Soporta solo tres componentes */}
                    {
                        house.map(item=>{
                            return(
                                <tr key={item.address}>
                                    <td style={{ width: "50px" }}>
                                        <img src={item.images[0]} style={{ width: "70px" }} />
                                    </td>
                                    <td>{item.address}</td>
                                    <td>
                                        <Link >
                                            <Button variant="secondary" style={{ width:"100%" }}>View</Button>
                                        </Link>
                                    </td>
                                </tr>
                            );
                        })
                    }
                    
                </tbody>
                </Table>
                
                :<div style={{ height:"100%", width:"100%", display:"flex", justifyContent:"center", alignItems:"center" }}>
                    <Spinner animation="border" />
                </div>
            }
        </div>
    );
}