import React, { PureComponent, useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export function ModalGraphic(params) {
    const [ houseMoreVisit, setHouseMoreVisit ] = useState([]);
    const [ houseMoreViewed, setHouseMoreViewed ] = useState([]);

    useEffect(()=>{
        fetch('/api/visit/?graphic=true&limit=4')
            .then(res=>res.json())
            .then(res=>{
                if(res.status === 200){
                    const transformedData = res.data.map(item => ({
                        name: 'Property ' + item.house_id,
                        view: item.visit_count
                    }));

                    setHouseMoreViewed(transformedData);
                }
                
            })
            
        fetch('/api/houses/?orderByViewed=DESC&limit=4')
            .then(res=>res.json())
            .then(res=>{
                if(res.status === 200){
                    const transformedData = res.data.map(item => ({
                        name: 'Property ' + item.id,
                        view: item.viewed
                    }));

                    setHouseMoreVisit(transformedData);
                }
                
            })
    }, [])
    
    return (
        <div className="content-graphic">
            <div style={{ height:"280px", maxWidth:"600px", width:"100%", paddingTop:"5px" }}>
                <h6 style={{ width:"100%", textAlign:"center" }}>Most Visited Property Chart</h6>
                {   houseMoreViewed.length != 0
                    ?<ResponsiveContainer width="100%" height="100%">
                        <BarChart
                        width={300}
                        height={300}
                        data={houseMoreViewed}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                        >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                            <Bar dataKey="view" fill="#82ca9d" activeBar={<Rectangle fill="#619675" stroke="grey" />} />
                        </BarChart>
                    </ResponsiveContainer>
                    
                    :<div style={{ height:"100%", width:"100%", display:"flex", justifyContent:"center", alignItems:"center" }}>
                        <Spinner animation="border" />
                    </div>
                }
            </div>
            <div style={{ height:"280px", maxWidth:"600px", width:"100%", paddingTop:"5px" }}>
                <h6 style={{ width:"100%", textAlign:"center" }}>Most viewed property graph</h6>

                {   houseMoreVisit.length != 0
                    ?<ResponsiveContainer width="100%" height="100%">
                        <BarChart
                        width={300}
                        height={300}
                        data={houseMoreVisit}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                        >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                            <Bar dataKey="view" fill="#4291ff" activeBar={<Rectangle fill="#487bc2" stroke="grey" />} />
                        </BarChart>
                    </ResponsiveContainer>

                    :<div style={{ height:"100%", width:"100%", display:"flex", justifyContent:"center", alignItems:"center" }}>
                        <Spinner animation="border" />
                    </div>
                }
            </div>
        </div>
    );
}