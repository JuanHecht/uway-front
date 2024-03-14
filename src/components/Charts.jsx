import React, { useContext } from 'react';
import { LineChart, Text, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Area, AreaChart, ResponsiveContainer } from 'recharts';
import { AuthContext } from "../context/auth.context";


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
        <ResponsiveContainer width="80%"  >
        <div style={{ position: 'relative', width: '100%' }}>
            <AreaChart
                width={400}
                height={300}
                fontSize={10}
                data={last7DaysLogs}
                margin={{ top: 5, right: 10, left: 10, bottom: 50 }}
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
                <YAxis dataKey= "mood" />
                <Area type="monotone" dataKey="mood"  stroke="#8884d8" fillOpacity={1} fill="url(#mood)" />
                <Line type="monotone" dataKey="mood"  stroke="#8884d8" fillOpacity={1} fill="url(#mood)" />
            </AreaChart>
            <div style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translate(-50%, -50%)', color: 'rgba(0, 0, 0, 0.5)' }}>
                <Text>Recent Mood</Text>
            </div>
        </div>
    </ResponsiveContainer>
    
    );
};

export default Charts;
