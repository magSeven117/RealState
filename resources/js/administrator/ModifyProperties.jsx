import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { HeaderAdministrator } from "../components/Administrator/Header";
import { Spinner } from "react-bootstrap";
import SunEditor from 'suneditor';
import 'suneditor/dist/css/suneditor.min.css';
import plugins from 'suneditor/src/plugins'
import { HouseContext } from "../context/houseContext";
import Carousel from 'react-bootstrap/Carousel';

export function ModifyProperties() {
    const { id } = useParams();
    const [data, setData] = useState();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmittingDelete, setIsSubmittingDelete] = useState(false);
    const [error, setError] = useState();
    const [description, setDescription] = useState('');
    const editorRef = useRef(null);
    const { typeHouse, feature } = useContext(HouseContext);
    let featuresChecked;

    useEffect(() => {
        fetch('/api/houses/?id=' + id)
            .then(res => res.json())
            .then(res => {
                console.log(res)
                setData(res.data[0]);
                setDescription(res.data[0].description || '');
                featuresChecked = res.data[0].features 
                    ? res.data[0].features 
                    : [];
            });
    }, [id]);

    useEffect(() => {
        if (data) {
            editorRef.current = SunEditor.create(document.getElementById('editor'), {
                plugins: plugins,
                buttonList: [
                    ['undo', 'redo'],
                    ['bold', 'italic', 'underline', 'fontColor', 'fontSize', 'align', 'list'],
                    ['align', 'horizontalRule', 'list', 'lineHeight'],
                    ['fullScreen', 'showBlocks', 'codeView'],
                ],
                height: '300px',
            });
        }
    }, [data]);

    return (
        <>
            <HeaderAdministrator />
            <div style={{ width: "100%", padding: "100px 0", display: "flex", justifyContent: "center", alignItems: "center" }}>
                {
                    data
                        ? <form method="post" action={"/api/houses/update/" + id} className="form" id="form" style={{ maxWidth: "600px", width: "100%" }}>
                            <div className="title">
                                Modify Use,
                                <br />
                                <span>
                                    Modify the info to continue.
                                </span>
                            </div>

                            {/* Address */}
                            <div style={{ width:"100%" }}>
                                <div className="title" style={{ margin:"0", marginBottom:"5px"}}>
                                    <span>Address *</span>
                                </div>
                                <input
                                    style={{ fontWeight: "600", fontFamily: "Arial" }}
                                    className="input-visit"
                                    name="address"
                                    placeholder="Address"
                                    type="text"
                                    defaultValue={data.address}
                                    required
                                />
                            </div>

                            {/* Images */}
                            <div style={{ width:"100%" }}>
                                <div className="title" style={{ margin:"0", marginBottom:"5px"}}>
                                    <span>Images *</span>
                                </div>
                                <div>
                                    <Carousel style={{height:"50px", width:"100%"}}>
                                        <Carousel.Item style={{ width:"100px" }}>
                                            <img src={data.images[0]} alt="" style={{ height:"100px", objectFit:"cover" }} />
                                        </Carousel.Item>
                                    </Carousel>
                                </div>
                                <input
                                    style={{ fontWeight: "600", fontFamily: "Arial" }}
                                    className="input-visit"
                                    name="image"
                                    placeholder="Images"
                                    type="file"
                                    required
                                />
                            </div>

                            {/* Description */}
                            <div style={{ width:"100%" }}>
                                <div className="title" style={{ margin:"0", textAlign:"center", marginBottom:"5px" }}>
                                    <span>Modify Properties *</span>
                                </div>
                                <textarea id="editor" style={{ display: 'none' }} defaultValue={description || ""}></textarea>
                            </div>
                            
                            {/* Price and Size */}
                            <div style={{ width:"100%", display:"flex", gap:"10px", justifyContent:"space-between" }}>
                                <div>
                                    <div className="title" style={{ margin:"0", marginBottom:"5px" }}>
                                        <span>Price *</span>
                                    </div>
                                    <input
                                        style={{ fontWeight: "600", fontFamily: "Arial"}}
                                        className="input-visit"
                                        name="price"
                                        placeholder="Price"
                                        type="number"
                                        defaultValue={data.price}
                                        required
                                    />
                                </div>
                                <div>
                                    <div className="title" style={{ margin:"0", marginBottom:"5px" }}>
                                        <span>Size (mt2) *</span>
                                    </div>
                                    <input
                                        style={{ fontWeight: "600", fontFamily: "Arial"}}
                                        className="input-visit"
                                        name="price"
                                        placeholder="Size"
                                        type="number"
                                        defaultValue={data.size}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Bathroom and Room */}
                            <div style={{ width:"100%", display:"flex", gap:"10px", justifyContent:"space-between" }}>
                                <div>
                                    <div className="title" style={{ margin:"0", marginBottom:"5px" }}>
                                        <span>Bathroom *</span>
                                    </div>
                                    <input
                                        style={{ fontWeight: "600", fontFamily: "Arial"}}
                                        className="input-visit"
                                        name="bathroom"
                                        placeholder="Bathroom"
                                        type="number"
                                        defaultValue={data.bathroom}
                                        required
                                    />
                                </div>
                                <div>
                                    <div className="title" style={{ margin:"0", marginBottom:"5px" }}>
                                        <span>Room *</span>
                                    </div>
                                    <input
                                        style={{ fontWeight: "600", fontFamily: "Arial"}}
                                        className="input-visit"
                                        name="quarters"
                                        placeholder="Room"
                                        type="number"
                                        defaultValue={data.quarters}
                                        required
                                    />
                                </div>
                            </div>

                            {/* floor and Date of Construction */}
                            <div style={{ width:"100%", display:"flex", gap:"10px", justifyContent:"space-between" }}>
                                <div>
                                    <div className="title" style={{ margin:"0", marginBottom:"5px" }}>
                                        <span>Floor</span>
                                    </div>
                                    <input
                                        style={{ fontWeight: "600", fontFamily: "Arial"}}
                                        className="input-visit"
                                        name="floor"
                                        placeholder="Floor"
                                        type="number"
                                        defaultValue={data.floor}
                                    />
                                </div>
                                <div style={{  width:"100%", maxWidth:"243px" }}>
                                    <div className="title" style={{ margin:"0", marginBottom:"5px" }}>
                                        <span>Date of Construction *</span>
                                    </div>
                                    <input
                                        style={{ fontWeight: "600", fontFamily: "Arial" }}
                                        className="input-visit"
                                        name="date_construction"
                                        placeholder="Date of Construction"
                                        type="date"
                                        defaultValue={data.date_construction}
                                        required
                                    />
                                </div>
                            </div>

                            {/* House Type */}
                            <div style={{ width:"100%" }}>
                                <div className="title" style={{ margin:"0", marginBottom:"5px" }}>
                                    <span>House Type</span>
                                </div>
                                <select 
                                    name="type_house" 
                                    id="type_house" 
                                    className="input-visit"
                                    style={{ fontWeight: "600", fontFamily: "Arial" }}
                                    defaultValue={data.type_house.type_house ? data.type_house.type_house : ""}
                                >
                                    <option value="" disabled>Select the type of house</option>
                                    {
                                        typeHouse && typeHouse.map(item=>{
                                            return(
                                                <option 
                                                key={item.id}   
                                                value={item.type_house} 
                                                style={{ textTransform:"capitalize" }}
                                                >
                                                    {item.type_house}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>

                            {/* Feature */}
                            <div style={{ width:"100%" }}>
                                <div className="title" style={{ margin:"0", marginBottom:"5px" }}>
                                    <span>Features</span>
                                </div>
                                <div style={{ display:"flex", width:"100%", height:"100%", flexWrap:"wrap", gap:"20px" }}>
                                    {
                                        feature.length > 0 && feature.map((item) => {
                                            const isChecked = data.features.some(f => f.name === item.name);
                                            return (
                                                <div key={item.id} style={{ width:"100px" }}>
                                                    <label className="container-checkbox">
                                                        <input  
                                                            type="checkbox" 
                                                            name={`feature[]`} 
                                                            id={`feature-${item.id}`} 
                                                            data-value={item.name}
                                                            defaultValue={item.name}
                                                            defaultChecked={isChecked}
                                                            />
                                                        <div className="checkmark checkmark_feature"></div>
                                                    </label>
                                                    <span style={{ textTransform:"capitalize" }}>
                                                        {item.name}
                                                    </span>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>

                            {/* Error */}
                            <div style={{ width: '100%', textAlign: 'center' }}>
                                <span style={{ textAlign: "center", fontSize: "13px", color: "red", fontWeight: "600", width: "100%" }}>
                                    {error}
                                </span>
                            </div>
                            
                            {/* Button */}
                            <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                                <span className="button-confirm" style={{ margin: "0", paddingTop: "5px", textAlign: "center", width:"180px" }} disabled={isSubmittingDelete}>
                                    {isSubmittingDelete ? 'Submitting...' : 'Delete Propertie→'}
                                </span>

                                <button className="button-confirm" type="submit" style={{ margin: "0", width:"180px" }} disabled={isSubmitting}>
                                    {isSubmitting ? 'Submitting...' : 'Modify Propertie→'}
                                </button>
                            </div>
                        </form>

                        : <Spinner animation="border" />
                }

            </div>
        </>
    );
}
