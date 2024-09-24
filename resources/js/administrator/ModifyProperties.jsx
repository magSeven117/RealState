import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom"; // Para obtener parámetros de la URL
import { HeaderAdministrator } from "../components/Administrator/Header"; // Componente de encabezado
import { Spinner } from "react-bootstrap"; // Componente de carga
import SunEditor from 'suneditor'; // Editor de texto enriquecido
import 'suneditor/dist/css/suneditor.min.css'; // Estilos del editor
import plugins from 'suneditor/src/plugins'; // Plugins para el editor
import { HouseContext } from "../context/houseContext"; // Contexto para la información de la casa
import { Swiper, SwiperSlide } from 'swiper/react'; // Componentes de Swiper para mostrar imágenes
import 'swiper/css'; // Estilos de Swiper
import 'swiper/css/pagination'; // Estilos de paginación de Swiper
import { Pagination, Navigation } from 'swiper/modules'; // Módulos de Swiper

export function ModifyProperties() {
    const { id } = useParams(); // Obtener el ID de la propiedad desde la URL
    const [data, setData] = useState(); // Estado para almacenar datos de la propiedad
    const [isSubmitting, setIsSubmitting] = useState(false); // Estado para controlar el envío del formulario
    const [isSubmittingDelete, setIsSubmittingDelete] = useState(false); // Estado para controlar la eliminación
    const [error, setError] = useState(); // Estado para almacenar mensajes de error
    const [description, setDescription] = useState(''); // Estado para la descripción de la propiedad
    const editorRef = useRef(null); // Referencia al editor de texto
    const { typeHouse, feature } = useContext(HouseContext); // Obtener tipos de casa y características desde el contexto
    let featuresChecked; // Variable para almacenar características seleccionadas
    const [images, setImages] = useState(); // Estado para almacenar imágenes de la propiedad
    const [token, setToken] = useState(''); // Estado para almacenar el token CSRF

    // Efecto para obtener datos de la propiedad al cargar el componente
    useEffect(() => {
        fetch('/api/houses/?id=' + id) // Llamada a la API para obtener datos de la casa
            .then(res => res.json())
            .then(res => {
                setData(res.data[0]); // Almacenar datos de la casa

                setImages(res.data[0].images); // Almacenar imágenes de la casa

                setDescription(res.data[0].description || ''); // Almacenar descripción o vacío

                // Obtener características de la casa
                featuresChecked = res.data[0].features 
                    ? res.data[0].features 
                    : [];
            });
        
        // Obtener el token CSRF
        fetch('/api/csrf-token')
            .then(res => res.json())
            .then(res => {
                setToken(res.csrf_token); // Almacenar token CSRF
            });
    }, [id]); // Dependencia del efecto: se ejecuta al cargar el componente o cambiar el ID

    // Efecto para inicializar el editor de texto enriquecido
    useEffect(() => {
        if (data) { // Verifica si hay datos de la propiedad
            editorRef.current = SunEditor.create(document.getElementById('editor'), { // Inicializa el editor
                plugins: plugins, // Agregar plugins
                buttonList: [ // Lista de botones para el editor
                    ['undo', 'redo'],
                    ['bold', 'italic', 'underline', 'fontColor', 'fontSize', 'align', 'list'],
                    ['align', 'horizontalRule', 'list', 'lineHeight'],
                    ['fullScreen', 'showBlocks', 'codeView'],
                ],
                height: '300px', // Altura del editor
            });
        }
    }, [data]); // Dependencia del efecto: se ejecuta al cargar datos

    // Función para manejar el cambio de imágenes (eliminar una imagen)
    const handleChangeImage = (item) => {
        const newArray = images.filter(x => {
            return x != item; // Filtra la imagen seleccionada
        });

        setImages(newArray); // Actualiza el estado de las imágenes
    };

    // Función para manejar el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault(); // Previene el comportamiento por defecto del formulario

        setIsSubmitting(true); // Cambia el estado a enviando

        const editorContent = editorRef.current.getContents(); // Obtiene el contenido del editor
        document.getElementById('editor').value = editorContent; // Establece el contenido en un campo oculto

        const form = document.getElementById('form'); // Obtiene el formulario

        const data = new FormData(form); // Crea un nuevo objeto FormData con los datos del formulario

        // Agrega imágenes antiguas al FormData
        images.forEach(item => {
            data.append('images_old[]', item.replace("http://192.168.1.117:8000//storage/", "")); // Agrega cada imagen al FormData
        });

        const action = form.getAttribute('action'); // Obtiene la acción del formulario
        const method = form.getAttribute('method'); // Obtiene el método del formulario
        
        // Configura los encabezados para la solicitud
        const headers = new Headers();
        headers.append('X-CSRF-TOKEN', token); // Agrega el token CSRF
        headers.append('Accept', 'application/json'); // Indica que espera respuesta en JSON

        // Configuración de la solicitud
        const config = {
            method: method,
            headers: headers,
            mode: "cors",
            cache: 'no-cache',
            body: data, // Cuerpo de la solicitud con los datos del formulario
        };

        // Envía la solicitud
        fetch(action, config)
            .then(res => res.json())
            .then(res => {
                if (res.status === 422) { // Manejo de errores de validación
                    setError(res.error ? Object.values(res.error).flat()[0] : 'Validation failed.');
                }
                setError(""); // Vacia el error en caso que haya
                setIsSubmitting(false); // Cambia el estado de envío a falso
            });
    };


    return (
        <>
            <HeaderAdministrator />
            {/* Contenedor principal con estilos para centrar el formulario */}
            <div style={{ width: "100%", padding: "100px 0", display: "flex", justifyContent: "center", alignItems: "center" }}>
                {
                    data  // Verificamos si hay datos disponibles
                        ? <form 
                            method="post" 
                            action={"/api/houses/update/" + id}  // Acción del formulario para actualizar la casa
                            className="form" 
                            id="form" 
                            style={{ maxWidth: "600px", width: "100%" }}  // Estilos del formulario
                            onSubmit={handleSubmit}  // Función que maneja el envío del formulario
                        >
                            {/* Titulo de Modify */}
                            <div className="title" style={{ margin:"0" }}>
                                Modify Use,
                                <br />
                                <span>
                                    Modify the info to continue.
                                </span>
                            </div>
    
                            {/* Campo para la dirección */}
                            <div style={{ width:"100%" }}>
                                <div className="title" style={{ margin:"0", marginBottom:"5px"}}>
                                    <span>Address *</span>  {/* Etiqueta para el campo de dirección */}
                                </div>
                                <input
                                    style={{ fontWeight: "600", fontFamily: "Arial" }}
                                    className="input-visit"
                                    name="address"  // Nombre del campo
                                    placeholder="Address"
                                    type="text"
                                    defaultValue={data.address}  // Valor por defecto de la dirección
                                    required  // Campo obligatorio
                                />
                            </div>
    
                            {/* Sección de imágenes */}
                            <div style={{ width:"100%" }}>
                                <div className="title" style={{ margin:"0", marginBottom:"5px"}}>
                                    <span>Images *</span>  {/* Etiqueta para las imágenes */}
                                </div>
                                
                                {/* Carrusel de imágenes */}
                                <div>
                                    <Swiper
                                        slidesPerView={3}  // Número de imágenes a mostrar
                                        spaceBetween={30}  // Espacio entre las imágenes
                                        navigation={true}  // Habilita navegación
                                        modules={[Pagination, Navigation]}  // Módulos de Swiper
                                        className="mySwiper"
                                        style={{ margin:"20px 0", height:"100px" }}  // Estilos del carrusel
                                    >
                                        {
                                            images.map((item, index) => {
                                                return (
                                                    <SwiperSlide key={'image_house' + index} style={{ minWidth:"120px" }}>
                                                        <span 
                                                            style={{ position:"absolute", top:"1px", right:"1px", cursor:"pointer" }}  // Estilo para el botón de eliminar imagen
                                                            onClick={() => handleChangeImage(item)}  // Función para eliminar la imagen
                                                        >
                                                            {/* Icono para eliminar imagen */}
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" width={"25px"} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                            </svg>
                                                        </span>
                                                        <img src={item} style={{ minWidth:"120px" }} alt={"house" + data.type_house.type_house} />  {/* Imagen de la casa */}
                                                    </SwiperSlide>
                                                )
                                            })
                                        }
                                    </Swiper>
                                </div>
    
                                {/* Campo para subir nuevas imágenes */}
                                <input
                                    style={{ fontWeight: "600", fontFamily: "Arial" }}
                                    className="input-visit"
                                    name="images[]"  // Nombre del campo para las nuevas imágenes
                                    placeholder="Images"
                                    type="file"
                                    multiple  // Permite subir múltiples imágenes
                                    accept="image/*"  // Acepta solo archivos de imagen
                                />
                            </div>
    
                            {/* Campo para la descripción */}
                            <div style={{ width:"100%" }}>
                                <div className="title" style={{ margin:"0", textAlign:"center", marginBottom:"5px" }}>
                                    <span>Modify Properties *</span>  {/* Etiqueta para la descripción */}
                                </div>
                                <textarea id="editor" name="description" required style={{ display: 'none' }} defaultValue={description || ""}></textarea>  {/* Campo de descripción */}
                            </div>
                            
                            {/* Sección para precio y tamaño */}
                            <div style={{ width:"100%", display:"flex", gap:"10px", justifyContent:"space-between" }}>
                                <div>
                                    <div className="title" style={{ margin:"0", marginBottom:"5px" }}>
                                        <span>Price *</span>  {/* Etiqueta para el precio */}
                                    </div>
                                    <input
                                        style={{ fontWeight: "600", fontFamily: "Arial" }}
                                        className="input-visit"
                                        name="price"  // Nombre del campo para precio
                                        placeholder="Price"
                                        type="number"
                                        step="0.01"  // Permite decimales
                                        defaultValue={data.price}  // Valor por defecto del precio
                                        required  // Campo obligatorio
                                    />
                                </div>
                                <div>
                                    <div className="title" style={{ margin:"0", marginBottom:"5px" }}>
                                        <span>Size (mt2) *</span>  {/* Etiqueta para el tamaño */}
                                    </div>
                                    <input
                                        style={{ fontWeight: "600", fontFamily: "Arial"}}
                                        className="input-visit"
                                        name="size"  // Nombre del campo para tamaño
                                        placeholder="Size"
                                        type="number"
                                        defaultValue={data.size}  // Valor por defecto del tamaño
                                        required  // Campo obligatorio
                                    />
                                </div>
                            </div>
    
                            {/* Sección para baños y habitaciones */}
                            <div style={{ width:"100%", display:"flex", gap:"10px", justifyContent:"space-between" }}>
                                <div>
                                    <div className="title" style={{ margin:"0", marginBottom:"5px" }}>
                                        <span>Bathroom *</span>  {/* Etiqueta para baños */}
                                    </div>
                                    <input
                                        style={{ fontWeight: "600", fontFamily: "Arial"}}
                                        className="input-visit"
                                        name="bathroom"  // Nombre del campo para baños
                                        placeholder="Bathroom"
                                        type="number"
                                        defaultValue={data.bathroom}  // Valor por defecto de los baños
                                        required  // Campo obligatorio
                                    />
                                </div>
                                <div>
                                    <div className="title" style={{ margin:"0", marginBottom:"5px" }}>
                                        <span>Room *</span>  {/* Etiqueta para habitaciones */}
                                    </div>
                                    <input
                                        style={{ fontWeight: "600", fontFamily: "Arial"}}
                                        className="input-visit"
                                        name="quarters"  // Nombre del campo para habitaciones
                                        placeholder="Room"
                                        type="number"
                                        defaultValue={data.quarters}  // Valor por defecto de las habitaciones
                                        required  // Campo obligatorio
                                    />
                                </div>
                            </div>
    
                            {/* Sección para piso y fecha de construcción */}
                            <div style={{ width:"100%", display:"flex", gap:"10px", justifyContent:"space-between" }}>
                                <div>
                                    <div className="title" style={{ margin:"0", marginBottom:"5px" }}>
                                        <span>Floor</span>  {/* Etiqueta para piso */}
                                    </div>
                                    <input
                                        style={{ fontWeight: "600", fontFamily: "Arial"}}
                                        className="input-visit"
                                        name="floor"  // Nombre del campo para piso
                                        placeholder="Floor"
                                        type="number"
                                        defaultValue={data.floor}  // Valor por defecto del piso
                                    />
                                </div>
                                <div style={{  width:"100%", maxWidth:"243px" }}>
                                    <div className="title" style={{ margin:"0", marginBottom:"5px" }}>
                                        <span>Date of Construction *</span>  {/* Etiqueta para fecha de construcción */}
                                    </div>
                                    <input
                                        style={{ fontWeight: "600", fontFamily: "Arial" }}
                                        className="input-visit"
                                        name="date_construction"  // Nombre del campo para fecha de construcción
                                        placeholder="Date of Construction"
                                        type="date"
                                        defaultValue={data.date_construction}  // Valor por defecto de la fecha de construcción
                                        required  // Campo obligatorio
                                    />
                                </div>
                            </div>
    
                            {/* Tipo de casa */}
                            <div style={{ width:"100%" }}>
                                <div className="title" style={{ margin:"0", marginBottom:"5px" }}>
                                    <span>House Type</span>  {/* Etiqueta para tipo de casa */}
                                </div>
                                <select 
                                    name="type_house" 
                                    id="type_house" 
                                    className="input-visit"
                                    style={{ fontWeight: "600", fontFamily: "Arial" }}
                                    defaultValue={data.type_house.type_house ? data.type_house.type_house : ""}  // Valor por defecto del tipo de casa
                                >
                                    <option value="" disabled>Select the type of house</option>  {/* Opción por defecto */}
                                    {
                                        typeHouse && typeHouse.map(item => {
                                            return (
                                                <option 
                                                key={item.id}   
                                                value={item.id} 
                                                style={{ textTransform:"capitalize" }}  // Estilo para capitalizar el texto
                                                >
                                                    {item.type_house}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            
                            {/* Características de la casa */}
                            <div style={{ width:"100%" }}>
                                <div className="title" style={{ margin:"0", marginBottom:"5px" }}>
                                    <span>Features</span>  {/* Etiqueta para características */}
                                </div>
                                <div style={{ display:"flex", width:"100%", flexWrap:"wrap", gap:"20px", marginLeft:"5px" }}>
                                    {
                                        feature.length > 0 && feature.map((item) => {
                                            const isChecked = data.features.some(f => f.name === item.name);  // Verifica si la característica ya está seleccionada
                                            return (
                                                <div key={item.id} style={{ width:"100px", display:"flex", alignItems:"center" }}>
                                                    <label className="container-checkbox">
                                                        <input  
                                                            type="checkbox" 
                                                            name={`feature[]`}  // Nombre del campo para características
                                                            id={`feature-${item.id}`} 
                                                            data-value={item.name}  // Valor de la característica
                                                            defaultValue={item.id}
                                                            defaultChecked={isChecked}  // Marca el checkbox si la característica está seleccionada
                                                        />
                                                        <div className="checkmark checkmark_feature"></div>  {/* Estilo para el checkbox */}
                                                    </label>
                                                    <span style={{ textTransform:"capitalize", marginTop:"3px" }}>
                                                        {item.name}
                                                    </span>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
    
                            {/* Publicación de la propiedad */}
                            <div style={{ width:"100%" }}>
                                <div className="title" style={{ margin:"0", marginBottom:"5px" }}>
                                    <span>Public</span>  {/* Etiqueta para publicación */}
                                </div>
                                <div style={{ display:"flex", width:"100%", alignItems:"center", marginLeft:"5px" }}>
                                    <label className="container-checkbox">
                                        <input  
                                            type="checkbox" 
                                            name={`published`}  // Nombre del campo para publicación
                                            id={`published`} 
                                            data-value={true}
                                            defaultValue={"1"}
                                            defaultChecked={data.published}  // Marca el checkbox si la propiedad está publicada
                                        />
                                        <div className="checkmark checkmark_feature"></div>  {/* Estilo para el checkbox */}
                                    </label>
                                    <span style={{ textTransform:"capitalize", marginTop:"3px" }}>
                                        Published 
                                    </span>
                                </div>
                            </div>
    
                            {/* Mensaje de error */}
                            <div style={{ width: '100%', textAlign: 'center' }}>
                                <span style={{ textAlign: "center", fontSize: "13px", color: "red", fontWeight: "600", width: "100%" }}>
                                    {error}  {/* Mensaje de error si existe */}
                                </span>
                            </div>
                            
                            {/* Botones de acción */}
                            <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                                <span className="button-confirm" style={{ margin: "0", paddingTop: "5px", textAlign: "center", width:"180px" }} disabled={isSubmittingDelete}>
                                    {isSubmittingDelete ? 'Submitting...' : 'Delete Property→'}  {/* Botón para eliminar la propiedad */}
                                </span>
    
                                <button className="button-confirm" type="submit" style={{ margin: "0", width:"180px" }} disabled={isSubmitting}>
                                    {isSubmitting ? 'Submitting...' : 'Modify Property→'}  {/* Botón para modificar la propiedad */}
                                </button>
                            </div>
                        </form>
    
                        : <Spinner animation="border" />  // Muestra un spinner si no hay datos disponibles
                }
            </div>
        </>
    );
    
}
