import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Box } from "@chakra-ui/react";
import './Calendar.css'

const MyCalendar = ({ dailyLogs }) => {
    const [loading, setLoading] = useState(true);
    const [formattedEvents, setFormattedEvents] = useState([]);

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

    useEffect(() => {
        /* console.log("Daily logs updated:", dailyLogs); */
        if (dailyLogs.length > 0) {
            const formattedEvents = dailyLogs.map(dailyLog => ({
                title: '',
                start: new Date(dailyLog.createdAt),
                mood: dailyLog.mood
            }));
            /* console.log("Formatted events:", formattedEvents); */
            setFormattedEvents(formattedEvents);
            setLoading(false);
        }
    }, [dailyLogs]);

    if (loading) {
        return <div>Loading...</div>;
    }
    /* if (!loading){
        console.log("how it is supposed"+formattedEvents.map((log)=>{
            return log.mood
        }))
    } */

    return (
        <Box>
            <FullCalendar
                height="310px"
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                events={formattedEvents}
                eventContent={({ event }) => (
                    <img src={`${mapMoodToNameAndImage(event.extendedProps.mood)}`} alt="" style={{ width: '100%', height: '100%' }} />
                )}
                headerToolbar={{
                    start: 'prev', // will normally be on the left. if RTL, will be on the right
                    center: 'title',
                    end: 'next' // will normally be on the right. if RTL, will be on the left
                }}
            />
        </Box>
    );
};

export default MyCalendar;
