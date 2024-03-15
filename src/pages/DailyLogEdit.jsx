/*import React, { useState, useEffect } from "react";
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
        axios.get(`https://uway-back.onrender.com/logs/dailylogs/logdetail/${id}`, {
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

        axios.put(`https://uway-back.onrender.com/logs/dailylogs/${id}`, reqBody, {
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
          .delete(`https://uway-back.onrender.com/logs/dailylogs/${id}`)
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

export default DailyLogEdit; */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import {
    IconButton,
    HStack,
    Button,
    FormControl,
    FormLabel,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    Input,
    Text,
    Box,
    Heading
  } from '@chakra-ui/react';
import { FaRunning, FaBicycle, FaSwimmer, FaBookOpen, FaGamepad } from 'react-icons/fa';

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

    useEffect(() => {
        axios.get(`https://uway-back.onrender.com/logs/dailylogs/logdetail/${id}`, {
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

    const handleAddActivity = (activity) => {
        if (activities.includes(activity)) {
          setActivities(activities.filter(Activity => Activity !== activity));
        } else {
          setActivities([...activities, activity]);
        }
      }
    
      const handleAddGoal = (goal) => {
        if (goals.includes(goal)) {
          setGoals(goals.filter(Goal => Goal !== goal));
        } else {
          setGoals([...goals, goal])
        }
      };

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

        axios.put(`https://uway-back.onrender.com/logs/dailylogs/${id}`, reqBody, {
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
          .delete(`https://uway-back.onrender.com/logs/dailylogs/${id}`)
          .then(() => {
            navigate("/home");
          })
          .catch((error) => console.log(error));
      };

    // Render logic here
    return (
        <Box m="4">
          <Heading>Feeling something different</Heading>
        <form onSubmit={handleUpdateSubmit}>
      {error && <p>{error}</p>}
      <FormControl>
        <FormLabel>Mood</FormLabel>
        <Input
          type="number"
          name="mood"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Wake Time</FormLabel>
        <Input
          type="time"
          name="wakeTime"
          value={wakeTime}
          onChange={(e) => setWakeTime(e.target.value)}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Sleep Time</FormLabel>
        <Input
          type="time"
          name="sleepTime"
          value={sleepTime}
          onChange={(e) => setSleepTime(e.target.value)}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Energy Level</FormLabel>
        <Slider
          aria-label="energy-level-slider"
          min={1}
          max={10}
          defaultValue={1}
          value={energyLevel}
          onChange={(value) => setEnergyLevel(value)}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb boxSize={6}>
            {energyLevel}
          </SliderThumb>
        </Slider>
      </FormControl>
      <FormControl>
        <FormLabel>Main Focus</FormLabel>
        <Input
          type="text"
          name="mainFocus"
          value={mainFocus}
          onChange={(e) => setMainFocus(e.target.value)}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Activities</FormLabel>
        <HStack spacing={4}>
          <Box>
          <IconButton
            icon={<FaRunning />}
            onClick={() => handleAddActivity("Running")}
            colorScheme={activities.includes("Running") ? "green" : "gray"}
            borderRadius="full"
          />
          <Text fontSize="10px">Running</Text>
          </Box>
          <Box>
          <IconButton
            icon={<FaBicycle />}
            onClick={() => handleAddActivity("Biking")}
            colorScheme={activities.includes("Biking") ? "green" : "gray"}
            borderRadius="full"
          />
          <Text fontSize="10px">Biking</Text>
          </Box>
          <Box>
          <IconButton
            icon={<FaSwimmer />}
            onClick={() => handleAddActivity("Swimming")}
            colorScheme={activities.includes("Swimming") ? "green" : "gray"}
            borderRadius="full"
          />
           <Text fontSize="10px">Swimming</Text>
          </Box>
          <Box>
          <IconButton
            icon={<FaBookOpen />}
            onClick={() => handleAddActivity("Reading")}
            colorScheme={activities.includes("Reading") ? "green" : "gray"}
            borderRadius="full"
          />
          <Text fontSize="10px">Reading</Text>
          </Box>
          <Box>
          <IconButton
            icon={<FaGamepad />}
            onClick={() => handleAddActivity("Gaming")}
            colorScheme={activities.includes("Gaming") ? "green" : "gray"}
            borderRadius="full"
          />
          <Text fontSize="10px">Gaming</Text>
          </Box>
        </HStack>

      </FormControl>


      <FormControl>
        <FormLabel>Goals</FormLabel>
        <HStack spacing={4}>
          <Box>
            <IconButton
              icon={<FaRunning />}
              onClick={() => handleAddGoal("Running")}
              colorScheme={goals.includes("Running") ? "green" : "gray"}
              borderRadius="full"
            />
            <Text fontSize="10px">Running</Text>
          </Box>
          <Box>
            <IconButton
              icon={<FaBicycle />}
              onClick={() => handleAddGoal("Biking")}
              colorScheme={goals.includes("Biking") ? "green" : "gray"}
              borderRadius="full"
            />
            <Text fontSize="10px">Biking</Text>
          </Box>
          <Box>
            <IconButton
              icon={<FaSwimmer />}
              onClick={() => handleAddGoal("Swimming")}
              colorScheme={goals.includes("Swimming") ? "green" : "gray"}
              borderRadius="full"
            />
            <Text fontSize="10px">Swimming</Text>
          </Box>
          <Box>
            <IconButton
              icon={<FaBookOpen />}
              onClick={() => handleAddGoal("Reading")}
              colorScheme={goals.includes("Reading") ? "green" : "gray"}
              borderRadius="full"
            />
            <Text fontSize="10px">Reading</Text>
          </Box>
          <Box>
            <IconButton
              icon={<FaGamepad />}
              onClick={() => handleAddGoal("Gaming")}
              colorScheme={goals.includes("Gaming") ? "green" : "gray"}
              borderRadius="full"
            />
            <Text fontSize="10px">Gaming</Text>
          </Box>
        </HStack>

      </FormControl>
      <FormControl>
        <FormLabel>Notes</FormLabel>
        <Input
          type="text"
          name="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </FormControl>
      <Box mt="20px" display="flex"  justifyContent="space-evenly">
      <Box>
      <Button colorScheme="green" size="sm" mb="50px" type="submit">Update</Button>
      </Box>
      <Box>
            <Button colorScheme="red" size="sm" mb="50px" onClick={handleDelete}>Delete</Button>
        </Box>
        </Box>
    </form>
       
        </Box >
    );
}

export default DailyLogEdit;
