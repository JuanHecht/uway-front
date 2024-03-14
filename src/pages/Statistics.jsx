/* import React, { useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import DailyLogCard from "../components/DailyLogCard.jsx";
import MyCalendar from '../components/Calendar.jsx';
import Charts from "../components/Charts.jsx";
import { Button } from "@chakra-ui/react";
import OftenTogether from "../components/OftenTogether.jsx";

import { Box } from "@chakra-ui/react";
import MonthlyLog from "../components/MonthlyLog.jsx";

function Statistics() {
    const { user, dailyLogs } = useContext(AuthContext);
    const [showDailyLogs, setShowDailyLogs] = useState(true);

    const toggleComponent = (showDaily) => {
        setShowDailyLogs(showDaily);
    };

    return (
        <Box>
            <h1>Your Journey</h1>
            <MyCalendar dailyLogs={dailyLogs} />
            <Box>
                <Button colorScheme="green" onClick={() => toggleComponent(true)}>Show Daily Logs</Button>
                <Button colorScheme="green" onClick={() => toggleComponent(false)}>Show Charts</Button>
            </Box>
            {showDailyLogs ? (
                <>
                    
                    {dailyLogs.map((dailyLog) => (
                        <DailyLogCard key={dailyLog._id} dailyLog={dailyLog} />
                    ))}
                </>
            ) : ( <>
                <Button>Week</Button>
                <Button>Month</Button>
                <Button>Year</Button>
                <OftenTogether />
                <Charts />
                <MonthlyLog/>
                
                </>
            )}
        </Box>
    );
}

export default Statistics;

 */

import React, { useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import DailyLogCard from "../components/DailyLogCard.jsx";
import MyCalendar from '../components/Calendar.jsx';
import Charts from "../components/Charts.jsx";
import { Button } from "@chakra-ui/react";
import OftenTogether from "../components/OftenTogether.jsx";
import { Box } from "@chakra-ui/react";
import MonthlyLog from "../components/MonthlyLog.jsx";

function Statistics() {
    const { user, dailyLogs } = useContext(AuthContext);
    const [showDailyLogs, setShowDailyLogs] = useState(true);
    const [viewMode, setViewMode] = useState('week'); // Default view mode is 'week'

    const toggleComponent = (showDaily) => {
        setShowDailyLogs(showDaily);
    };

    const changeViewMode = (mode) => {
        setViewMode(mode);
    };

    return (
        <Box>
            <h1>Your Journey</h1>
            <MyCalendar dailyLogs={dailyLogs} />
            <Box>
                <Button colorScheme="green" onClick={() => toggleComponent(true)}>Show Daily Logs</Button>
                <Button colorScheme="green" onClick={() => toggleComponent(false)}>Show Charts</Button>
            </Box>
            {showDailyLogs ? (
                <>
                    {dailyLogs.map((dailyLog) => (
                        <DailyLogCard key={dailyLog._id} dailyLog={dailyLog} />
                    ))}
                </>
            ) : (
                <>
                    <Button onClick={() => changeViewMode('week')}>Week</Button>
                    <Button onClick={() => changeViewMode('month')}>Month</Button>
                    <Button onClick={() => changeViewMode('year')}>Year</Button>
                    {viewMode === 'week' && <Charts />} {/* Render Charts component when 'week' mode is selected */}
                    {viewMode === 'month' && <MonthlyLog />} {/* Render MonthlyLog component when 'month' mode is selected */}
                    {viewMode === 'year' && <OftenTogether />} {/* Render OftenTogether component when 'year' mode is selected */}
                    <OftenTogether />
                </>
            )}
        </Box>
    );
}

export default Statistics;
