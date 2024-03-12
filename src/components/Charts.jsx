
import React, { useContext } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { AuthContext } from "../context/auth.context";

const Charts = () => {
    const { dailyLogs } = useContext(AuthContext);

    // Function to format the date to display only the day
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.getDate(); // Extracts only the day from the date
    };

    // Sort dailyLogs by date
    const sortedLogs = dailyLogs.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

    return (
        <LineChart
            width={400}
            height={300}
            data={dailyLogs}
            margin={{ top: 5, right: 30, left: 20, bottom: 50 }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
                dataKey="createdAt"
                tickFormatter={formatDate} // Use tickFormatter to format the x-axis ticks
            />
            <YAxis dataKey="mood" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="mood" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
    );
};

export default Charts;



