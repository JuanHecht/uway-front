import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function DailyLogEdit() {
    const [mood, setMood] = useState(0);
    const [wakeTime, setWakeTime] = useState("");
    const [sleepTime, setSleepTime] = useState("");
    const [bedTime, setBedtime] = useState({});
    const [energyLevel, setEnergyLevel] = useState(0);
    const [mainFocus, setMainFocus] = useState("");
    const [activities, setActivities] = useState([]);
    const [activityInput, setActivityInput] = useState("");
    const [goals, setGoals] = useState([]);
    const [goalInput, setGoalInput] = useState("");
    const [notes, setNotes] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate()

    const { id } = useParams();

    const handleAddActivity = () => {
        if (activityInput.trim() !== "") {
            setActivities([...activities, activityInput.trim()]);
            setActivityInput(""); // Clear the input field
        }
    };

    const handleAddGoal = () => {
        if (goalInput.trim() !== "") {
            setGoals([...goals, goalInput.trim()]);
            setGoalInput(""); // Clear the input field
        }
    };

    useEffect(() => {
        axios.get(`http://localhost:5005/logs/dailylogs/logdetail/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`
            }
        })
            .then((response) => {
                const { mood, bedTime, energyLevel, mainFocus, activities, goals, notes } = response.data;
                setMood(mood);
                setBedtime(bedTime)
                setWakeTime(bedTime.wakeTime);
                setSleepTime(bedTime.sleepTime);
                setEnergyLevel(energyLevel);
                setMainFocus(mainFocus);
                setActivities(activities);
                setGoals(goals);
                setNotes(notes);
                setLoading(true);
            })
            .catch((error) => {
                console.log(error);
                // Handle error
            });
    }, [id]);
    if (loading === true) {
        console.log("your mood is" + mood)
        console.log(notes)
        console.log(bedTime)
        console.log("your sleep time" + bedTime[1])
        console.log(sleepTime)
    }



    const handleUpdateSubmit = (e) => {
        e.preventDefault();
        const reqBody = {
            mood,
            bedTime: { wakeTime, sleepTime },
            energyLevel,
            mainFocus,
            activities,
            goals,
            notes
        };

        axios.put(`http://localhost:5005/logs/dailylogs/${id}`, reqBody, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`
            }
        })
            .then(() => {
                navigate("/dailylog/id")

            })
            .catch((error) => {
                const errorDescription = error.message;
                setError(errorDescription);
            });
    };

    const handleDelete = () => {
        axios
          .delete(`http://localhost:5005/logs/dailylogs/${id}`)
          .then(() => {
            navigate("/profile");
          })
          .catch((error) => console.log(error));
      };

    // Render logic here
    return (
        <div>
        <form onSubmit={handleUpdateSubmit}>
            {error && <p>{error}</p>}
            <div>
                <label>Mood</label>
                <input
                    type="number"
                    name="mood"
                    value={mood}
                    onChange={(e) => setMood(e.target.value)}
                />
            </div>
            <div>
                <label>Wake Time</label>
                <input
                    type="time" 
                    name="wakeTime"
                    value={wakeTime}
                    onChange={(e) => setWakeTime(e.target.value)}
                />
            </div>
            <div>
                <label>Sleep Time</label>
                <input
                    type="time"
                    name="sleepTime"
                    value={sleepTime}
                    onChange={(e) => setSleepTime(e.target.value)}
                />
            </div>
            <div>
                <label>Energy Level</label>
                <input
                    type="number"
                    name="energyLevel"
                    value={energyLevel}
                    onChange={(e) => setEnergyLevel(e.target.value)}
                />
            </div>
            <div>
                <label>Main Focus</label>
                <input
                    type="text"
                    name="mainFocus"
                    value={mainFocus}
                    onChange={(e) => setMainFocus(e.target.value)}
                />
            </div>
            <div>
                <label>Activities</label>
                <div>
                    <input
                        type="text"
                        value={activityInput}
                        onChange={(e) => setActivityInput(e.target.value)}
                    />
                    <button type="button" onClick={handleAddActivity}>Add Activity</button>
                </div>
                <ul>
                    {activities.map((activity, index) => (
                        <li key={index}>{activity}</li>
                    ))}
                </ul>
            </div>
            <div>
                <label>Goals</label>
                <div>
                    <input
                        type="text"
                        value={goalInput}
                        onChange={(e) => setGoalInput(e.target.value)}
                    />
                    <button type="button" onClick={handleAddGoal}>Add Goal</button>
                </div>
                <ul>
                    {goals.map((goal, index) => (
                        <li key={index}>{goal}</li>
                    ))}
                </ul>
            </div>
            <div>
                <label>Notes</label>
                <input
                    type="text"
                    name="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                />
            </div>
            <div>
                <button type="submit">Update</button>
            </div>
        </form>
        <div>
            <button onClick={handleDelete}>Delete log</button>
        </div>
        </div>
    );

}

export default DailyLogEdit;
