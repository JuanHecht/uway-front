import React, { useContext } from 'react';
import { AuthContext } from "../context/auth.context";
import { Box, Heading } from '@chakra-ui/react';

function OftenTogether() {

    const { dailyLogs, user } = useContext(AuthContext);


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

    return (
        <div >
          {/* <Heading size="sm">{user.name} when you sleep more than 7 hours your energy level is {averageEnergyLevelMoreThan7}</Heading>
           <Heading size="sm">{user.name} when you sleep les than 7 hours your energy level is {averageEnergyLevelLessThan7}</Heading>*/}
            <Heading size="sm">Hey {user.name} you know when you have been feeling good and bad</Heading >
            <Heading size="sm">Good days:</Heading>
            {dailyLogs.map((item) => {
                
                if (item.mood > 3) {
                    return (
                        <div  key={item._id}>
                            
                            {item.activities && item.activities.map((activity) => (
                                <div key={activity}>{activity}</div>
                            ))}
                        </div>
                    );
                } else {
                    return null;
                }
            })}
            <Heading size="sm">Not so good days:</Heading>
            {dailyLogs.map((item) => {
                if (item.mood < 3) {
                    return (
                        <div>
                            
                            {item.activities && item.activities.map((activity) => (
                                <div key={activity}>{activity}</div>
                            ))}
                        </div>
                    );
                } else {
                    return null;
                }
            })}
        </div>
    )

}

export default OftenTogether