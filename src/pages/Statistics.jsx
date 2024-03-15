import React, { useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import DailyLogCard from "../components/DailyLogCard.jsx";
import MyCalendar from '../components/Calendar.jsx';
import Charts from "../components/Charts.jsx";
import { Switch, Box, Button, Heading } from "@chakra-ui/react";
import OftenTogether from "../components/OftenTogether.jsx";
import YearlyLog from "../components/YearlyLog.jsx";
import MonthlyLog from "../components/MonthlyLog.jsx";

function Statistics() {
    const { user, dailyLogs } = useContext(AuthContext);
    const [showDailyLogs, setShowDailyLogs] = useState(true);
    const [viewMode, setViewMode] = useState('week'); // Default view mode is 'week'

    const toggleComponent = () => {
        setShowDailyLogs(!showDailyLogs);
    };

    const changeViewMode = (mode) => {
        setViewMode(mode);
    };

    return (
        <Box m="1">
            <Heading>Your Journey</Heading>
            <MyCalendar dailyLogs={dailyLogs} />
            <Box textAlign="center" fontWeight="bold" mt="20px" mb="20px">
            <Switch
                colorScheme="green"
                isChecked={!showDailyLogs}
                onChange={toggleComponent}
            >
                {showDailyLogs ? "Reports" : "Daily Logs"}
            </Switch>
        </Box>
            {showDailyLogs ? (
                <>
                <Heading textAlign="center" fontSize="lg">Pick a Date</Heading>
                    {dailyLogs.map((dailyLog) => (
                        <DailyLogCard key={dailyLog._id} dailyLog={dailyLog} />
                    ))}
                </>
            ) : (
                <Box mt ="10px">
                    <Button color="white" bg="#8884d8" height="30px" ml="20px" onClick={() => changeViewMode('week')}>Week</Button>
                    <Button color="white" bg="#8884d8" height="30px" ml="20px" onClick={() => changeViewMode('month')}>Month</Button>
                    <Button color="white" bg="#8884d8" height="30px" ml="20px" onClick={() => changeViewMode('year')}>Year</Button>
                    {viewMode === 'week' && <Charts />} {/* Render Charts component when 'week' mode is selected */}
                    {viewMode === 'month' && <MonthlyLog />} {/* Render MonthlyLog component when 'month' mode is selected */}
                    {viewMode === 'year' && <YearlyLog/>} {/* Render OftenTogether component when 'year' mode is selected */}
                    <OftenTogether/>
                </Box>
            )}
           
        </Box>
    );
}

export default Statistics;
