import React, { useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import DailyLogCard from "../components/DailyLogCard.jsx";
import MyCalendar from '../components/Calendar.jsx';
import Charts from "../components/Charts.jsx";
import { Button } from "@chakra-ui/react";
import OftenTogether from "../components/OftenTogether.jsx";

import { Box } from "@chakra-ui/react";

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
            <OftenTogether />
                <Charts />
                
                </>
            )}
        </Box>
    );
}

export default Statistics;

