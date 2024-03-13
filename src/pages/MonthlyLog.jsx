import React, { useState, useContext } from 'react';
import { AuthContext } from "../context/auth.context";
import { Button, Select } from '@chakra-ui/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

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
        <div>
            <Select onChange={handleMonthSelect} placeholder="Select month" style={{ margin: '10px' }}>
                {monthNames.map((month, index) => (
                    <option key={index + 1} value={index + 1}>{month}</option>
                ))}
            </Select>
            <div>
                {selectedMonth ? (
                    <div>
                        Mood for {monthNames[selectedMonth - 1]}: {averageMood} <img src={mapMoodToNameAndImage(Math.round(averageMood))} alt="" />
                    </div>
                ) : (
                    <div>Select a month to view average mood</div>
                )}
            </div>
            {/* Display filtered logs */}
            {filteredLogs.map(log => (
                <div key={log.id}>
                    {log.mood}
                </div>
            ))}
            <div>
                {selectedMonth ? (
                    <div>
                        <LineChart
                            width={400}
                            height={300}
                            data={mergedLogs}
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
                    </div>
                ) : (
                    <div>Select a month to view the chart</div>
                )}
            </div>
        </div>
    );
}

export default MonthlyLog;
