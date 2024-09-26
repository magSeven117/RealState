import React, { useContext, useEffect, useState } from "react";
import { HeaderAdministrator } from "../components/Administrator/Header";
import { AuthContext } from "../context/AuthContext";
import { Alert, Button, ButtonGroup, Spinner, Table } from "react-bootstrap";
import { HouseProvider } from "../context/houseContext";
import { ModalConfirmAlert } from "../components/Administrator/ModalConfirmAlert";
import { Link } from "react-router-dom";


export function VisitAdministrator({  }) {
    const { loginSuccessful } = useContext(AuthContext);
    const [ visit, setVisit ] = useState();
    const [ token, setToken] = useState();
    // const { urlAPI, setUrlAPI } = useContext(HouseProvider);
    const [ visited, setVisited ] = useState(false);
    const [ alertConfirmVisited, setAlertConfirmVisited ] = useState(false)
    const [ alertVisited, setAlertVisited ] = useState(false)
    const [ alertConfirmDelete, setAlertConfirmDelete ] = useState(false)
    const [ alertDelete, setAlertDelete ] = useState(false)
    const [ reload, setReload] = useState(false);
    const [ visit_id, setVisit_id ] = useState();
    
    useEffect(()=>{
        // Obtener el token CSRF
        fetch('/api/csrf-token')
            .then(res => res.json())
            .then(res => {
                setToken(res.csrf_token); // Almacenar token CSRF
            });
    }, [])

    useEffect(()=>{
        if(token){
            let url = '';

            if(visited){    
                url = "?visited=yes";
            }

            const headers = new Headers();
            headers.append('X-CSRF-TOKEN', token); // Agrega el token CSRF
            headers.append('Accept', 'application/json'); // Indica que espera respuesta en JSON

            const config = {
                method: 'GET', // Método de la solicitud
                headers: headers, // Encabezados configurados
                mode: "cors", // Modo de la solicitud
                cache: 'no-cache', // Sin caché
            };

            fetch('/api/visit'+url, config)
                .then(res=>res.json())
                .then(res=>{
                    console.log(res)
                    if(res.data.length != 0){
                        setVisit(res.data)
                    }
                })
        }
    }, [token, visited, reload])
    

    const handleChangeVisited = () => {
        setAlertConfirmVisited(false)

        
        
        const headers = new Headers();
        headers.append('X-CSRF-TOKEN', token); // Agrega el token CSRF
        headers.append('Accept', 'application/json'); // Indica que espera respuesta en JSON

        const config = {
            method: 'PUT', // Método de la solicitud
            headers: headers, // Encabezados configurados
            mode: "cors", // Modo de la solicitud
            cache: 'no-cache', // Sin caché
        };

        fetch('/api/visit/visited/'+visit_id, config)
            .then(res=>res.json())
            .then(res=>{
                if(res.status === 200){
                    setReload(!reload);
                    setAlertVisited(true);

                    setTimeout(() => {
                        setAlertVisited(false);
                    }, 2000);
                }
            })
    }
    
    const handleDeleteVisit = () => {
        setAlertConfirmDelete(false)

        const headers = new Headers();
        headers.append('X-CSRF-TOKEN', token); // Agrega el token CSRF
        headers.append('Accept', 'application/json'); // Indica que espera respuesta en JSON

        const config = {
            method: 'DELETE', // Método de la solicitud
            headers: headers, // Encabezados configurados
            mode: "cors", // Modo de la solicitud
            cache: 'no-cache', // Sin caché
        };

        fetch('/api/visit/delete/'+visit_id, config)
            .then(res=>res.json())
            .then(res=>{
                if(res.status === 200){
                    setReload(!reload);

                    setAlertDelete(true);

                    setTimeout(() => {
                        setAlertDelete(false);
                    }, 2000);
                }
            })
    }

    return(
        <>
            {
                loginSuccessful    
                ? <>
                    <HeaderAdministrator />
                    <div style={{ marginTop: "30px", padding: "0 10px" }}>
                            <div style={{ width:"100%", display:"flex", justifyContent:"center", marginBottom:"10px" }}>
                                <ButtonGroup aria-label="Basic example">
                                    <Button disabled={!visited} onClick={()=>setVisited(false)}>Scheduled visits</Button>
                                    <Button disabled={visited} onClick={()=>setVisited(true)}>Mark as Visited</Button>
                                </ButtonGroup>
                            </div>
                            
                            {

                            }
                            <div style={{ textAlign: "center", width: "100%" }}>
                                {
                                    !visited 
                                ? <h1>Scheduled visits</h1>
                                : <h1>Properties Visited</h1>
                                }
                            </div>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>phone</th>
                                        <th>Scheduled Date</th>
                                        <th>House</th>
                                        {
                                            !visited 
                                            ? <th>Mark</th>
                                            : <th>Visited</th>
                                        }
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        visit && visit.map((item) => ( // Mapeamos los datos de los usuarios para mostrarlos en la tabla
                                            <tr key={item.id}>
                                                <td style={{ textAlign: "center", width: "10px" }}>{item.id}</td>
                                                <td>{item.name+" "+item.lastname}</td>
                                                <td>{item.email}</td>
                                                <td>{item.phone}</td>
                                                <td style={!visited ? { color:"green", fontWeight:"600" } : {}}>{item.date_visit}</td>
                                                <td style={{ width:"128px" }}>
                                                    <Link to={'/property-details/'+item.id+"?admin_view=true"} target="_blank">
                                                        <Button variant="success" >View House</Button>
                                                    </Link>
                                                </td>
                                                {
                                                    !visited 
                                                    ? <td style={{ width: '50px' }}>
                                                        <Button 
                                                            variant="secondary" 
                                                            onClick={()=>{
                                                                setAlertConfirmVisited(true);
                                                                setVisit_id(item.id);
                                                            }}
                                                        >
                                                            Visited
                                                        </Button> {/* Botón para marcar de visitado */}
                                                    </td>
                                                    : <th style={visited ? { color:"green", fontWeight:"600" } : {}}>{item.visited_date}</th>
                                                }
                                                <td style={{ width: '50px' }}>
                                                    <Button 
                                                        variant="danger" 
                                                        onClick={()=>{
                                                            setAlertConfirmDelete(true);
                                                            setVisit_id(item.id);
                                                        }}
                                                    >
                                                        Delete
                                                    </Button> {/* Botón para eliminar visita */}
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </Table>

                    </div>
                    
                </>

                :<div style={{ height:"100vh", width:"100%", display:"flex", justifyContent:"center", alignItems:"center" }}>
                    <Spinner animation="border" />
                </div>
                
                
            }
            {
                (alertConfirmVisited || alertConfirmDelete) && (
                    <ModalConfirmAlert 
                        title={alertConfirmVisited ? 'You are about to mark this as visited.' : 'Delete Visit.'}
                        subtitle={alertConfirmVisited ? 'Marking it as visited will move it to the "Visited" table. Do you want to continue?' : 'You are about to delete this visit, do you want to continue?.'}
                        button={alertConfirmVisited ? 'Mark as Visited' : 'Delete'}
                        typeButton={alertConfirmVisited ? 'warning' : 'danger'}
                        buttonCancel={"Cancel"}
                        functionButtonCancel={()=>{
                            alertConfirmVisited 
                            ? setAlertConfirmVisited(false)
                            : setAlertConfirmDelete(false)
                        }}
                        functionButton={() => {
                            alertConfirmVisited 
                            ? handleChangeVisited()
                            : handleDeleteVisit() 
                        }} 
                    />
                )
            }
            {
                (alertVisited || alertDelete) && (
                    <div style={{
                        width: "100%",
                        position: "fixed",
                        top: 0,
                        left: 0, 
                        display: "flex", 
                        justifyContent:"center",
                        margin: "10px 0",
                        zIndex: 9999
                    }}>
                        <Alert variant='success'>
                            {
                            alertVisited 
                            ? "It has been marked as visited and moved to the 'Visited' table." 
                            : "The visit has been removed from the database."
                            }
                        </Alert>
                    </div>
                    
                )
            }
        </>
    )
}