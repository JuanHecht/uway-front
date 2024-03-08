import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import  { Link } from "react-router-dom";



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

    console.log("Daily Logs", dailyLogs);
    return (
        <div>
            <p>Your dailylogs</p>
            {dailyLogs.map((dailyLog)=>{
                return (
                    <div>
                    <div key={dailyLog._id}>
                        <h3>Mood: {dailyLog.mood}</h3>
                        <p>Notes: {dailyLog.notes}</p>
                        <Link to={`/dailylogedit/${dailyLog._id}`}>
                            <button>Edit log</button>
                        </Link>
                    </div>
                    </div>
                )
            })}
        </div>
    );
}

export default Statistics;
