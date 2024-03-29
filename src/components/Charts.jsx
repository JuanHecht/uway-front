import React, { useContext } from 'react';
import { LineChart, Text, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Area, AreaChart, ResponsiveContainer } from 'recharts';
import { AuthContext } from "../context/auth.context";
import OftenTogether from './OftenTogether';

import { Box } from '@chakra-ui/react';

import image1 from '/images/verysad_360.png'
import image2 from '/images/sad_360.png'
import image3 from '/images/normal_360.png'
import image4 from '/images/happy_360.png'
import image5 from '/images/veryhappy_360.png'

const images = [ image1, image2, image3, image4, image5];

const CustomYAxisTick = (props) => {
  const { x, y, payload } = props;
  const imageIndex = payload.value; // Assuming the value corresponds to the image index
  const imageSrc = images[imageIndex-1]; // Get the image source based on the index

  return (
    <image y={y - 10} xlinkHref={imageSrc} width={20} height={20} />
  );
};


const Charts = () => {
    const { dailyLogs } = useContext(AuthContext);


    // Function to format the date to display only the day
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, { weekday: 'long' }).slice(0,3); // Extracts only the day from the date
    };

    // Sort dailyLogs by date
    const sortedLogs = dailyLogs.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

    const currentDate = new Date();
   
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
        const date = new Date(currentDate);
        date.setDate(date.getDate() - i);
        last7Days.push(date);
    }

    const last7DaysLogs = last7Days.map(day => {
        const log = sortedLogs.find(log => {
            const logDate = new Date(log.createdAt);
            return logDate.toDateString() === day.toDateString();
        });

        return {
            createdAt: day.toISOString(), // Convert date to string
            mood: log ? log.mood : null // Set mood to null if no log exists for the day
        };
    });

    return (
        <div style={{width:"100%"}}>
        <ResponsiveContainer >
        <div style={{position:"relative", width:"100%", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}} >
            <AreaChart
                width={280}
                height={280}
                fontSize={10}
                data={last7DaysLogs}
                margin={{ top: 20, right: 0, left: -40, bottom: 50 }}
            >
                <defs>
                    <linearGradient id="mood" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <XAxis
                    dataKey="createdAt"
                    tickFormatter={formatDate} // Use tickFormatter to format the x-axis ticks
                />
                <YAxis dataKey= "mood" domain={[1, 5]} ticks={[ 1, 2, 3, 4, 5]} tick={<CustomYAxisTick />}/>
                <Area type="monotone" dataKey="mood"  stroke="#8884d8" fillOpacity={1} fill="url(#mood)" />
                <Line type="monotone" dataKey="mood"  stroke="#8884d8" fillOpacity={1} fill="url(#mood)" />
            </AreaChart>
            
        </div>
    </ResponsiveContainer>
  
    </div>
    );
};

export default Charts;
