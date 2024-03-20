import React, { useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import DailyLogCard from "../components/DailyLogCard.jsx";
import MyCalendar from '../components/Calendar.jsx';
import Charts from "../components/Charts.jsx";
import { Switch, Box, Button, Heading, Card, Text, Flex } from "@chakra-ui/react";
import OftenTogether from "../components/OftenTogether.jsx";
import YearlyLog from "../components/YearlyLog.jsx";
import MonthlyLog from "../components/MonthlyLog.jsx";

function Statistics() {
    const { user, dailyLogs } = useContext(AuthContext);
    const [showDailyLogs, setShowDailyLogs] = useState(false);
    const [viewMode, setViewMode] = useState('week'); // Default view mode is 'week'

    const toggleComponent = () => {
        setShowDailyLogs(!showDailyLogs);
    };

    const changeViewMode = (mode) => {
        setViewMode(mode);
    };

    return (
        <Box m="1" background="purple.50">
            <Card m="5px" mb="15px">
            <Heading textAlign="center">Your Journey</Heading>
            </Card>
            <Box p="5px" background="white">
            <Heading textAlign="center" size="md">Calendar</Heading>
            <MyCalendar dailyLogs={dailyLogs} />
            </Box>
            <Box p="5px" background="white" mt="15px">
            <Heading textAlign="center" size="md">Reports</Heading>
            <Flex justifyContent="center" alignItems="center" textAlign="center" fontWeight="bold" mt="10px" mb="10px">
                <Text mr="10px">Past logs</Text>
            <Switch
                size="lg"
                colorScheme="purple"
                isChecked={!showDailyLogs}
                onChange={toggleComponent}
            >
                
            </Switch>
            <Text ml="10px">Your reports</Text>
        </Flex>
            {showDailyLogs ? (
                <>
                <Heading textAlign="center" fontSize="lg">Pick a Date</Heading>
                    {dailyLogs.map((dailyLog) => (
                        <DailyLogCard key={dailyLog._id} dailyLog={dailyLog} />
                    ))}
                </>
            ) : (
                <Box>
                   
                    {viewMode === 'week' && <Charts />} {/* Render Charts component when 'week' mode is selected */}
                    {viewMode === 'month' && <MonthlyLog />} {/* Render MonthlyLog component when 'month' mode is selected */}
                    {viewMode === 'year' && <YearlyLog/>} {/* Render OftenTogether component when 'year' mode is selected */}
                    <Button color="white" bg="#8884d8" height="30px" ml="20px" onClick={() => changeViewMode('week')}>Week</Button>
                    <Button color="white" bg="#8884d8" height="30px" ml="20px" onClick={() => changeViewMode('month')}>Month</Button>
                    <Button color="white" bg="#8884d8" height="30px" ml="20px" onClick={() => changeViewMode('year')}>Year</Button>
                    <OftenTogether/>
                </Box>
            )}
            </Box>
           
        </Box>
    );
}

export default Statistics;
