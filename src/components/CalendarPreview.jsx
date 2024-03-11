import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';

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
        return <div>Loading...</div>;
    }

    return (
        <div>
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridWeek"
                headerToolbar={false}
                events={formattedEvents}
                eventContent={({ event }) => (
                    <img src={mapMoodToNameAndImage(event.extendedProps.mood)} alt="" style={{ width: '100%', height: '100%' }} />
                )}
            />
        </div>
    );
};

export default CalendarPreview;
