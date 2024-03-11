import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import { Link } from "react-router-dom";
import DailyLogCard from "../components/DailyLogCard.jsx";
import MyCalendar from '../components/Calendar.jsx'



function Statistics() {
    const [dailyLogs, setDailyLogs] = useState([]);

    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (user && user._id) { // Check if user and user._id are defined
            axios.get(`http://localhost:5005/logs/dailylogs/${user._id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`
                }
            })
                .then((response) => setDailyLogs(response.data))
                .catch((error) => console.log(error));
        }
    }, [user]);

    return (
        <div>
            <h1>Your Journey</h1>
            <MyCalendar dailyLogs={dailyLogs}/>
            {
                dailyLogs.map((dailyLog) => (
                    <DailyLogCard key={dailyLog._id} dailyLog={dailyLog} />
                ))
            }
        </div>
    );
}

export default Statistics;
