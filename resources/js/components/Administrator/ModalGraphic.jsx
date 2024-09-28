import React, { PureComponent } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    {
        name: 'Property 1',
        view: 4000,
    },
    {
        name: 'Property 2',
        view: 3000,
    },
    {
        name: 'Property 3',
        view: 2000,
    },
    {
        name: 'Property 4',
        view: 2780,
    }
];

export function ModalGraphic(params) {


    return (
        <div className="content-graphic">
            <div style={{ height:"280px", maxWidth:"600px", width:"100%", paddingTop:"5px" }}>
                <h6 style={{ width:"100%", textAlign:"center" }}>Most Visited Property Chart</h6>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                    width={300}
                    height={300}
                    data={data}
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
            </div>
            <div style={{ height:"280px", maxWidth:"600px", width:"100%", paddingTop:"5px" }}>
                <h6 style={{ width:"100%", textAlign:"center" }}>Most viewed property graph</h6>

                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                    width={300}
                    height={300}
                    data={data}
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
            </div>
        </div>
    );
}