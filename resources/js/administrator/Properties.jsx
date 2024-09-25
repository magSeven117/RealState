import React, { useContext, useEffect, useState } from "react";
import { HeaderAdministrator } from "../components/Administrator/Header"; // Componente del encabezado del administrador
import { AuthContext } from "../context/AuthContext"; // Contexto de autenticación
import { Spinner } from "react-bootstrap"; // Componente Spinner de react-bootstrap para mostrar carga
import Table from 'react-bootstrap/Table'; // Componente Table de react-bootstrap
import Button from 'react-bootstrap/Button'; // Componente Button de react-bootstrap
import { Link, useNavigate } from "react-router-dom"; // Para navegación entre rutas
import { Navigate } from "../components/Houses/Navigate"; 
import usePagination from "../hooks/Navigate";
import { HouseContext, HouseProvider } from "../context/houseContext";

export function PropertiesAdministrator() {
    const { loginSuccessful } = useContext(AuthContext); // Accedemos al estado de inicio de sesión desde el contexto
    const { currentItems, pageCount, handlePageClick } = usePagination();
    const { urlAPI, setUrlAPI } = useContext(HouseContext); // Estado para almacenar las propiedades y cambiar URL del Context
    const [ searchValue, setSearchValue] = useState();
    const query = new URLSearchParams(location.search);
    const navigate = useNavigate();

    // useEffect para cargar las propiedades desde la API al montar el componente
    useEffect(() => {
        const url = query.toString();

        if(url){
            setUrlAPI('/api/houses?'+url);
        } else {
            setUrlAPI('/api/houses');
        }
    }, [query]);

    // Hook que se ejecuta al cargar el componente
    useEffect(()=>{
        if(query.get('search')){ // Verifica si hay un parámetro de búsqueda en la URL
            setSearchValue(query.get('search')); // Si existe, establece el valor de búsqueda
        } else {
            setSearchValue("") // Si no existe, inicializa el valor de búsqueda como vacío
        }
    }, []); // Se ejecuta solo una vez al montar el componente

    const handleSearch = (e) => {
        const regex = /^[a-zA-Z0-9 ]+$/; // Expresión regular para permitir solo letras, números y espacios
    
        if(!regex.test(searchValue)) return; // Si el valor de búsqueda no coincide con la expresión regular, sale de la función
    
        if (searchValue.length > 3) { // Solo realiza la búsqueda si el valor tiene más de 3 caracteres
            navigate("?search=" + encodeURIComponent(searchValue)); // Navega a la ruta de búsqueda con el valor codificado
        }
    };

    return (
        <>
            {
                loginSuccessful ? ( // Comprobamos si el inicio de sesión fue exitoso
                    <>
                        <HeaderAdministrator /> {/* Encabezado del administrador */}
                        <div style={{ marginTop: "30px", padding: "0 10px" }}>
                            <div style={{ textAlign: "center", width: "100%" }}>
                                <h1>Properties</h1> {/* Título de la sección */}
                            </div>

                            <div style={{ display: "flex", width: "100%", justifyContent: "space-around", margin: "20px 0", gap:"10px", alignItems:"center" }}>
                                <Link to={'/dashboard/properties/create'}>  
                                    <Button variant="primary" style={{ padding:"2px 5px" }}>Add Property</Button> {/* Botón para agregar una nueva propiedad */}
                                </Link>

                                {/* Busqueda */}
                                <div className="container-icon-filter" style={{ display:"flex", flexDirection:"column", alignItems:"center", flexDirection:"row", maxWidth:"500px", width:"100%"  }} >
                                
                                    <div className="group-search">
                                        <input 
                                            placeholder="Search Houses" 
                                            type="text" 
                                            value={searchValue} 
                                            className="search__input" 
                                            id="searchHouse" 
                                            onChange={(e)=>setSearchValue(e.target.value)}
                                            onKeyDown={(e)=>{
                                                if(e.key === 'Enter'){
                                                    handleSearch();
                                                }
                                            }}
                                        />
                                        <button 
                                            className="search__button" 
                                            onClick={handleSearch}
                                        >
                                            <svg
                                            viewBox="0 0 16 16"
                                            className="bi bi-search"
                                            fill="currentColor"
                                            height="16"
                                            width="16"
                                            xmlns="http://www.w3.org/2000/svg"
                                            >
                                            <path
                                                d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"
                                            ></path>
                                            </svg>
                                        </button>
                                    </div>

                                    {/* Limpiar Filtros */}
                                    <div onClick={()=>{ setSearchValue(""); navigate("")}}>
                                        <button className="bin-button" style={{ height:"30px", width:"30px" }}>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="#000000"
                                                viewBox="0 0 39 7"
                                                className="bin-top"
                                            >
                                                <line strokeWidth="4" stroke="black" y2="5" x2="39" y1="5"></line>
                                                <line
                                                strokeWidth="3"
                                                stroke="black"
                                                y2="1.5"
                                                x2="26.0357"
                                                y1="1.5"
                                                x1="12"
                                                ></line>
                                            </svg>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="#000000"
                                                viewBox="0 0 33 39"
                                                className="bin-bottom"
                                            >
                                                <mask fill="white" id="path-1-inside-1_8_19">
                                                <path
                                                    d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"
                                                ></path>
                                                </mask>
                                                <path
                                                mask="url(#path-1-inside-1_8_19)"
                                                fill="rgb(77, 77, 77)"
                                                d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
                                                ></path>
                                                <path strokeWidth="4" stroke="rgb(77, 77, 77)" d="M12 6L12 29"></path>
                                                <path strokeWidth="4" stroke="rgb(77, 77, 77)" d="M21 6V29"></path>
                                            </svg>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 89 80"
                                                className="garbage"
                                            >
                                                <path
                                                fill="black"
                                                d="M20.5 10.5L37.5 15.5L42.5 11.5L51.5 12.5L68.75 0L72 11.5L79.5 12.5H88.5L87 22L68.75 31.5L75.5066 25L86 26L87 35.5L77.5 48L70.5 49.5L80 50L77.5 71.5L63.5 58.5L53.5 68.5L65.5 70.5L45.5 73L35.5 79.5L28 67L16 63L12 51.5L0 48L16 25L22.5 17L20.5 10.5Z"
                                                ></path>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                
                                
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
                                    {currentItems && currentItems.map((item) => (
                                        <tr key={item.id}>
                                            <td style={{ textAlign: "center", width: "10px" }}>{item.id}</td>
                                            <td style={{ width: "50px" }}>
                                                <img src={item.images[0]} alt={"house" + item.id} style={{ width: "70px" }} />
                                            </td>
                                            <td>{item.address}</td>
                                            <td><span>Public</span></td>
                                            <td style={{ width: '50px' }}>
                                                <Link to={'/dashboard/properties/modify/' + item.id} style={{ width: "min-content" }}>
                                                    <Button variant="warning">Modify</Button>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>

                            <div style={{ display: "flex", width: "100%", justifyContent: "center", marginTop: "20px" }}>
                                <Navigate pageCount={pageCount} handlePageClick={handlePageClick} />
                            </div>
                        </div>
                    </>
                ) : (
                    // Si no se ha iniciado sesión, se muestra un spinner de carga
                    <div style={{ height: "100vh", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Spinner animation="border" />
                    </div>
                )
            }
        </>
    );
}
