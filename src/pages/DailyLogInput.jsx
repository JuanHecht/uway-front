/* import axios from 'axios';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';


function DailyLogInput() {

  const [mood, setMood] = useState(0);
  const [bedTime, setBedTime] = useState({});
  const [energyLevel, setEnergyLevel] = useState(0);
  const [mainFocus, setMainFocus] = useState("");
  const [activities, setActivities] = useState([]);
  const [goals, setGoals] = useState([]);
  const [notes, setNotes] = useState("");

  const navigate = useNavigate();

    const handleSignUpSubmit = (e) => {
        e.preventDefault();
        const reqBody = { mood, bedTime, energyLevel, mainFocus, activities, goals, notes};
        axios
          .post("http://localhost:5005/logs/dailylogs", reqBody)
          .then(() => {
            navigate("/profile");
          })
          .catch((error) => {
            const errorDescription = error.data.message;
            setError(errorDescription);
          });
      };
  
    return (
        <form onSubmit={handleSignUpSubmit}>
            <div>
          <label>mood</label>
          <input
            type="number"
            name="mood"
            value={mood}
           onChange={(e) => setMood(e.target.value)}
          />
        </div>
        <div>
          <label>Bed Time</label>
          <input
            type="number"
            name="bedTime"
            value={bedTime}
           onChange={(e) => setBedTime(e.target.value)}
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
          <input
            type="text"
            name="activities"
            value={activities}
           onChange={(e) => setActivities(e.target.value)}
          />
        </div>
        <div>
          <label>Goals</label>
          <input
            type="text"
            name="goals"
            value={goals}
           onChange={(e) => setGoals(e.target.value)}
          />
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
          <button type="submit">Submit</button>
        </div>
            </form>
    )
}

export default DailyLogInput; */

import axios from 'axios';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

function DailyLogInput() {
  const [mood, setMood] = useState(0);
  const [wakeTime, setWakeTime] = useState("");
  const [sleepTime, setSleepTime] = useState("");
  const [energyLevel, setEnergyLevel] = useState(0);
  const [mainFocus, setMainFocus] = useState("");
  const [activities, setActivities] = useState([]);
  const [activityInput, setActivityInput] = useState(""); // New state to manage input for activities
  const [goals, setGoals] = useState([]);
  const [goalInput, setGoalInput] = useState(""); // New state to manage input for goals
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  
  const navigate = useNavigate();

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

  const handleSignUpSubmit = (e) => {
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
    
   // useEffect(()=>{

      axios
      .post("http://localhost:5005/logs/dailylogs", reqBody)

      .then(() => {
        navigate("/profile");
      })
      .catch((error) => {
        const errorDescription = error.message;
        setError(errorDescription);
      });

  //  }, [])  
  };
  
  


  
  return (
    <form onSubmit={handleSignUpSubmit}>
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
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}

export default DailyLogInput;
