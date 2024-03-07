import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";


function DailyLogEdit() {
    const [dailyLogs, setDailyLogs] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:5005/logs/dailylogs/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`
            }
        })
            .then((response) => setDailyLogs(response.data))
            .catch((error) => console.log(error));
    }, [id]);
    console.log("Daily Logs", dailyLogs);
    return (
        <div>
            <p>Edit</p>
        </div>
    )
}
export default DailyLogEdit;