import React, { useState, useContext } from 'react';
import { AuthContext } from "../context/auth.context";
import { Box, Select, Text, Image } from '@chakra-ui/react';
import OftenTogether from './OftenTogether';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Area, AreaChart, ResponsiveContainer } from 'recharts';

function MonthlyLog() {
    const { dailyLogs, user } = useContext(AuthContext);
    const [selectedMonth, setSelectedMonth] = useState(null);

    const mapMoodToNameAndImage = (moodNumber) => {
        switch (moodNumber) {
            case 1:
                return '/images/verysad_360.png';
            case 2:
                return '/images/sad_360.png';
            case 3:
                return '/images/normal_360.png';
            case 4:
                return '/images/happy_360.png';
            case 5:
                return '/images/veryhappy_360.png';
            default:
                return '/images/veryhappy_360.png';
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.getDate(); // Extracts only the day from the date
    };

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const handleMonthSelect = (event) => {
        setSelectedMonth(parseInt(event.target.value)); // Convert value to integer
    };

    const generateDaysArray = (year, month) => {
        const daysInMonth = new Date(year, month, 0).getDate();
        const daysArray = [];
        for (let i = 1; i <= daysInMonth; i++) {
            daysArray.push(`${year}-${month.toString().padStart(2, '0')}-${i.toString().padStart(2, '0')}`);
        }
        return daysArray;
    };

    const filteredLogs = selectedMonth ?
        dailyLogs.filter(item => new Date(item.createdAt).getMonth() + 1 === selectedMonth) :
        dailyLogs;

    const year = new Date().getFullYear();
    const daysInSelectedMonth = selectedMonth ? generateDaysArray(year, selectedMonth) : [];

    const mergedLogs = daysInSelectedMonth.map(day => {
        const log = filteredLogs.find(item => item.createdAt.includes(day));
        return {
            createdAt: day,
            mood: log ? log.mood : null
        };
    });

    let totalMood = 0;
    for (const log of filteredLogs) {
        totalMood += log.mood;
    }

    const averageMood = filteredLogs.length > 0 ? totalMood / filteredLogs.length : 0;

    return (
        <Box>
            <Select onChange={handleMonthSelect} placeholder="Select month" width="60%" ml="20px" mt="10px">
                {monthNames.map((month, index) => (
                    <option key={index + 1} value={index + 1}>{month}</option>
                ))}
            </Select>
            <Box>
                {selectedMonth ? (
                    <Box>
                        Mood for {monthNames[selectedMonth - 1]}: {averageMood} 
                    </Box>
                ) : (
                    <Box>Select a month to view average mood</Box>
                )}
            </Box>
          
            <div>
                {selectedMonth ? (
                    <ResponsiveContainer style={{width:"100%"}}>
                        <div style={{position:"relative", width:"100%", display:"flex", flexDirection:"column", justifyContent:"center"}} >
                            <AreaChart
                                width={360}
                                height={300}
                                fontSize={10}
                                data={mergedLogs}
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
                                <YAxis dataKey="mood" />
                                <Area type="monotone" dataKey="mood" stroke="#8884d8" fillOpacity={1} fill="url(#mood)" />
                                <Line type="monotone" dataKey="mood" stroke="#8884d8" fillOpacity={1} fill="url(#mood)" />
                            </AreaChart>
                            <div style={{position:"relative", width:"100%"}} >
                                <p>Recent Mood </p>
                            </div>
                        </div>
                    </ResponsiveContainer>
                ) : (
                    <Box>Select a month to view the chart</Box>
                )}
            </div>
            
        </Box>
    );
}

export default MonthlyLog;
