import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Box, Text, Flex } from '@chakra-ui/react';

const CalendarPreview = ({ dailyLogs }) => {
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
        if (dailyLogs.length > 0) {
            const formattedEvents = dailyLogs.map(dailyLog => ({
                title: '',
                start: new Date(dailyLog.createdAt),
                mood: dailyLog.mood
            }));
            setFormattedEvents(formattedEvents);
            setLoading(false);
        }
    }, [dailyLogs]);

    if (loading) {
        return <Box>Loading...</Box>;
    }

    return (
        <Flex direction="column" textAlign="center">
            {/*<Text mb="10px">This week's preview</Text>*/}
            <FullCalendar
                height="90px"
                plugins={[dayGridPlugin]}
                initialView="dayGridWeek"
                headerToolbar={false}
                events={formattedEvents}
                dayHeaderContent={({ date }) => (
                    <span className="text-s" style={{ fontSize: '20px' }}>{date.toLocaleDateString('en-US', { weekday: 'short' })}</span>
                )}
                /* dayCellContent={({ date }) => (
                    <span className="text-xs" style={{ fontSize: '10px' }}>{date.getDate()}</span>
                )} */
                eventContent={({ event }) => (
                    <img src={mapMoodToNameAndImage(event.extendedProps.mood)} alt="" style={{ width: '100%', height: '100%' }} />
                )}
            />


        </Flex>
    );
};

export default CalendarPreview;
