import React, { useContext } from 'react';
import { AuthContext } from "../context/auth.context";
import { Box , Heading} from '@chakra-ui/react';

function OftenTogether () {

   const { dailyLogs, user} = useContext(AuthContext);

   function calculateSleepDuration(sleepTime, wakeupTime) {
    // Splitting sleep time and wakeup time into hours and minutes
    const [sleepHours, sleepMinutes] = sleepTime.split(':').map(Number);
    const [wakeupHours, wakeupMinutes] = wakeupTime.split(':').map(Number);

    // Calculating the total minutes for both sleep time and wakeup time
    const sleepTotalMinutes = sleepHours * 60 + sleepMinutes;
    const wakeupTotalMinutes = wakeupHours * 60 + wakeupMinutes;

    // Calculating the difference
    let differenceMinutes = wakeupTotalMinutes - sleepTotalMinutes;

    // Handling the case where the wakeup time is earlier than the sleep time
    if (differenceMinutes < 0) {
        // Adding 24 hours worth of minutes to the difference
        differenceMinutes += 24 * 60;
    }

    return differenceMinutes;
}
   return (
    <div>
        <Heading size="sm">Hey {user.name} you know when you have been feeling good and bad</Heading >
        <Heading size="sm">Good days:</Heading>
        {dailyLogs.map((item) => {
            
            if (item.mood > 3) {
                return item.activities && item.activities.map((activity) => (
                    <div >{activity}</div>
                ));
            } else {
                return null;
            }
        })}
         <Heading size="sm">Not so good days:</Heading>
        {dailyLogs.map((item) => {
            if (item.mood < 3) {
                return item.activities && item.activities.map((activity) => (
                    <div>{activity}</div>
                ));
            } else {
                return null;
            }
        })}
    </div>
)

}

export default OftenTogether