import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from "../context/auth.context";
import { Table, Thead, Tbody, Tr, Th, Td, Box, Heading } from "@chakra-ui/react"

function OftenTogether() {

    const { dailyLogs, user } = useContext(AuthContext);
  
    const [goodActivityCounts, setGoodActivityCounts] = useState({});
    const [badActivityCounts, setBadActivityCounts] = useState({});


    // Initialize variables to store sums and counts
    /* let sumEnergyLevelMoreThan7 = 0;
    let countEnergyLevelMoreThan7 = 0;
    let sumEnergyLevelLessThan7 = 0;
    let countEnergyLevelLessThan7 = 0;


    // NEED TO DO LOADING LOGIC, UseEffect and/or loading state
    dailyLogs.forEach((item) => {
        let sleeping = item.bedTime.sleepTime
        console.log("sleeping" + sleeping)
        let waking = item.bedTime.wakeTime

        const sleepHours = calculateSleepHours(sleeping, waking);
        if (sleepHours > 7) {
            sumEnergyLevelMoreThan7 += item.energyLevel;
            countEnergyLevelMoreThan7++;
        } else {
            sumEnergyLevelLessThan7 += item.energyLevel;
            countEnergyLevelLessThan7++;
        }
    });

    // Calculate averages
    const averageEnergyLevelMoreThan7 = sumEnergyLevelMoreThan7 / countEnergyLevelMoreThan7;
    const averageEnergyLevelLessThan7 = sumEnergyLevelLessThan7 / countEnergyLevelLessThan7;

    // NEED TO DO LOADING LOGIC, UseEffect and/or loading state
    function calculateSleepHours(sleepTime, wakeTime) {
        console.log("recieved sleeping" + sleepTime)
        // Splitting the sleep time and wake time to extract hours and minutes
        const [sleepHours, sleepMinutes] = sleepTime.split(':').map(Number);
        const [wakeHours, wakeMinutes] = wakeTime.split(':').map(Number);

        // Calculating the total minutes of sleep
        let totalSleepMinutes = 0;

        if (wakeHours > sleepHours || (wakeHours === sleepHours && wakeMinutes >= sleepMinutes)) {
            totalSleepMinutes = (wakeHours - sleepHours) * 60 + (wakeMinutes - sleepMinutes);
        } else {
            // When wake time crosses into the next day
            totalSleepMinutes = (24 - sleepHours + wakeHours) * 60 + (wakeMinutes - sleepMinutes);
        }

        // Converting total sleep minutes to hours
        const totalSleepHours = totalSleepMinutes / 60;

        return totalSleepHours;
    } */

    useEffect(() => {
        const goodCounts = {};
        dailyLogs.forEach(item => {
            if (item.activities && item.mood>3) {
                item.activities.forEach(activity => {
                    goodCounts[activity] = (goodCounts[activity] || 0) + 1;
                });
            }
        });
        setGoodActivityCounts(goodCounts);
    }, [dailyLogs]);

    useEffect(() => {
        const badCounts = {};
        dailyLogs.forEach(item => {
            if (item.activities && item.mood<3) {
                item.activities.forEach(activity => {
                    badCounts[activity] = (badCounts[activity] || 0) + 1;
                });
            }
        });
        setBadActivityCounts(badCounts);
    }, [dailyLogs]);

    return (
        <Box mb="60px">
    <Box>
        <Heading size="sm">Hey {user.name}, you know what lifted your mood and what not</Heading>

        <Heading size="sm">Good Activity Counts:</Heading>
        <Table variant="simple">
            <Thead>
                <Tr>
                    <Th>Activity</Th>
                    <Th>Count</Th>
                </Tr>
            </Thead>
            <Tbody>
                {Object.keys(goodActivityCounts).map(activity => (
                    <Tr key={activity}>
                        <Td>{activity}</Td>
                        <Td>{goodActivityCounts[activity]}</Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    </Box>

    <Box>
        

        <Heading size="sm">Bad Activity Counts:</Heading>
        <Table variant="simple">
            <Thead>
                <Tr>
                    <Th>Activity</Th>
                    <Th>Count</Th>
                </Tr>
            </Thead>
            <Tbody>
                {Object.keys(badActivityCounts).map(activity => (
                    <Tr key={activity}>
                        <Td>{activity}</Td>
                        <Td>{badActivityCounts[activity]}</Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    </Box>
</Box>
    );
}

export default OftenTogether;