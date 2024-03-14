import { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../context/auth.context";
import { UserContext } from '../context/user.context'

import axios from 'axios';
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
import { FaBed, FaSun } from "react-icons/fa";

function DailyLogInput() {
  const { moodNum } = useContext(AuthContext);
  const { mainFocus } = useContext(UserContext);
  const { activities } = useContext(UserContext);

  const [mood, setMood] = useState(moodNum);
  const [wakeTime, setWakeTime] = useState("");
  const [sleepTime, setSleepTime] = useState("");
  const [energyLevel, setEnergyLevel] = useState(0);
  /* const [mainFocus, setMainFocus] = useState(""); */
  const [selectedMainFocus, setSelectedMainFocus] = useState("");
  /* const [activities, setActivities] = useState([]); */
  
  const [goals, setGoals] = useState([]);
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");


  const navigate = useNavigate();


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

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    const reqBody = {
      mood,
      bedTime: { wakeTime, sleepTime },
      energyLevel,
      mainFocus: selectedMainFocus,
      activities,
      goals,
      notes
    };

    axios.post("http://localhost:5005/logs/dailylogs", reqBody, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`
      }
    })
      .then((response) => {
        navigate("/profile");
      })
      .catch((error) => {
        const errorDescription = error.message;
        setError(errorDescription);
      });
  };

  return (
    <Box m="4">
      <Heading>How's your day going?</Heading>
      <form onSubmit={handleSignUpSubmit}>
        {error && <p>{error}</p>}
        <FormControl>
          <FormLabel>Main Focus</FormLabel>
          <HStack spacing={4}>
            {mainFocus.map((focus, index) => (
              <Box key={index} onClick={() => setSelectedMainFocus(focus.name)}>
                <IconButton
                  icon={<img src={focus.icon} alt={focus.name} style={{ maxWidth: "80%", maxHeight: "80%" }}/>}
                  colorScheme={selectedMainFocus === focus.name ? "green" : "gray"}
                  borderRadius="full"
                />
                <Text fontSize="10px">{focus.name}</Text>
              </Box>
            ))}
          </HStack>
        </FormControl>
        <Box textAlign="center">
          <Text>Sleeptime</Text>
          <Box display="flex" justifyContent="center" >
            <Box width="50%">
              <FormControl display="flex" flexDirection="column" alignItems="center">
                <Box fontSize="2rem" mb="0.5rem"><FaBed /></Box>
                <FormLabel ml="0" textAlign="center" fontSize="0.8rem">went to bed last night</FormLabel>
                <Input
                  width="80%"
                  type="time"
                  name="sleepTime"
                  value={sleepTime}
                  onChange={(e) => setSleepTime(e.target.value)}
                />
              </FormControl>
            </Box>
            <Box width="50%" ml="10%">
              <FormControl display="flex" flexDirection="column" alignItems="center" >
                <Box fontSize="2rem" mb="0.5rem"><FaSun /></Box>
                <FormLabel mr="0" textAlign="center" fontSize="0.8rem">woke up today</FormLabel>
                <Input
                  width="80%"
                  type="time"
                  name="wakeTime"
                  value={wakeTime}
                  onChange={(e) => setWakeTime(e.target.value)}
                />
              </FormControl>
            </Box>
          </Box>
        </Box>
        <FormControl>
          <FormLabel>How energized do you feel today?</FormLabel>
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
        {/* <FormControl>
          <FormLabel>Main Focus</FormLabel>
          <Input
            type="text"
            name="mainFocus"
            value={mainFocus}
            onChange={(e) => setMainFocus(e.target.value)}
          />
        </FormControl> */}
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
        <Button mb="200px" type="submit">Submit</Button>
      </form>
    </Box>
  );
}

export default DailyLogInput;
