import axios from 'axios';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';


function DailyLogInput() {

  const [mood, setMood] = useState(null);
  const [bedTime, setBedTime] = useState(null);
  const [energyLevel, setEnergyLevel] = useState(null);
  const [mainFocus, setMainFocus] = useState(null);
  const [activities, setActivities] = useState(null);
  const [goals, setGoals] = useState(null);
  const [notes, setNotes] = useState(null);

  const navigate = useNavigate();

    const handleSignUpSubmit = (e) => {
        e.preventDefault();
        const reqBody = { mood, bedTime, energyLevel, mainFocus, activities, goals, notes};
        axios
          .post("http://localhost:5005/auth/signup", reqBody)
          .then(() => {
            navigate("/login");
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
           // onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Bed Time</label>
          <input
            type="number"
            name="bedTime"
            value={bedTime}
           // onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Energy Level</label>
          <input
            type="number"
            name="energyLevel"
            value={energyLevel}
           // onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Main Focus</label>
          <input
            type="text"
            name="mainFocus"
            value={mainFocus}
           // onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Activities</label>
          <input
            type="text"
            name="activities"
            value={activities}
           // onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Goals</label>
          <input
            type="text"
            name="goals"
            value={goals}
           // onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Notes</label>
          <input
            type="text"
            name="notes"
            value={notes}
           // onChange={(e) => setEmail(e.target.value)}
          />
        </div>
            </form>
    )
}

export default DailyLogInput;