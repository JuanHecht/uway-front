/* import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const mapMoodToNameAndImage = (moodNumber) => {
    switch (moodNumber) {
      case 1:
        return { name: 'Very Sad', imageUrl: 'images/verysad-360.png' };
      case 2:
        return { name: 'Sad', imageUrl: 'images/sad-360.png' };
      case 3:
        return { name: 'Normal', imageUrl: 'images/versad-360.png' };
      case 4:
        return { name: 'Happy', imageUrl: 'images/normal-360.png' };
      case 5:
        return { name: 'Very Happy', imageUrl: 'images/happy-360.png' };
      default:
        return { name: 'Unknown', imageUrl: 'images/veryhappy-360.png' };
    }
  };

function MyCalendar({ events }){
    const formattedEvents = events.map(dailyLog => {
        const moodInfo = mapMoodToNameAndImage(dailyLog.mood);
        return {
          title: moodInfo.name, // Mood name
          imageUrl: moodInfo.imageUrl, // Mood image URL
          start: new Date(dailyLog.createdAt), // Using 'createdAt' as the start date
          end: new Date(dailyLog.createdAt), // Using 'createdAt' as the end date
        };
      });

      return (
        <div style={{ height: 500 }}>
          <Calendar
            localizer={localizer}
            events={formattedEvents}
            startAccessor="start"
            endAccessor="end"
            style={{ margin: '50px auto' }}
          />
        </div>
      );
}
export default MyCalendar; */
import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

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
        console.log("Daily logs updated:", dailyLogs);
        if (dailyLogs.length > 0) {
            const formattedEvents = dailyLogs.map(dailyLog => ({
                title: '', // You may add the title here if required
                start: new Date(dailyLog.createdAt),
                mood: dailyLog.mood // Pass mood directly for eventContent function
            }));
            console.log("Formatted events:", formattedEvents);
            setFormattedEvents(formattedEvents);
            setLoading(false);
        }
    }, [dailyLogs]);

    if (loading) {
        return <div>Loading...</div>;
    } /* else {
        console.log(mapMoodToNameAndImage(formattedEvents[0]))
    } */
    if (!loading){
        console.log("how it is supposed"+formattedEvents.map((log)=>{
            return log.mood
        }))
    }

    return (
        <div>
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                events={formattedEvents}
                eventContent={({ event }) => (
                    <img src={`${mapMoodToNameAndImage(event.extendedProps.mood)}`}  alt="" style={{ width: '100%', height: '100%' }} />
                )}
            />
        </div>
    );
};

export default MyCalendar;
