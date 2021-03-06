import * as React from 'react';
import {LineChart,Line, Legend, CartesianGrid, XAxis, YAxis, Tooltip} from 'recharts';

 const Chart= (props)=>{

 const {width, height, value, xKey, yKey, zKey, fKey} = props;
 const data = value;
   
return (                     
    <LineChart width={width} height={height} data={data}
    margin={{ top: 30, right: 0, left: 0, bottom: 0 }}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey= {xKey} />
    <YAxis />
    <Tooltip />
    <Legend />
    <Line type="monotone" dataKey= {yKey} stroke="#8884d8" />
    <Line type="monotone" dataKey={zKey} stroke="#82ca9d" />
    <Line type="monotone" dataKey={fKey} stroke="#ff746f" />
  </LineChart>
);
};

export default Chart;

 