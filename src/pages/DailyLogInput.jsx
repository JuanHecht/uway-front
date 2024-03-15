import React, { useState, useContext } from "react";
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
  Heading,
  SimpleGrid
} from '@chakra-ui/react';

import { FaBed, FaSun } from "react-icons/fa";

function DailyLogInput() {
  const { moodNum } = useContext(AuthContext);
  const { mainFocus } = useContext(UserContext);
  const { activities } = useContext(UserContext);
  const { goals } = useContext(UserContext);

  const [mood, setMood] = useState(moodNum);
  const [wakeTime, setWakeTime] = useState("");
  const [sleepTime, setSleepTime] = useState("");
  const [energyLevel, setEnergyLevel] = useState(0);
  const [selectedMainFocus, setSelectedMainFocus] = useState("");
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [selectedGoals, setSelectedGoals] = useState([]);
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [showAllActivities, setShowAllActivities] = useState(false);
  const [showAllGoals, setShowAllGoals] = useState(false);
  const [showAllFocus, setshowAllFocus] = useState(false);

  const navigate = useNavigate();

  const handleAddActivity = (activity) => {
    const index = selectedActivities.indexOf(activity);
    if (index !== -1) {
      setSelectedActivities(prevActivities => prevActivities.filter(item => item !== activity));
    } else {
      setSelectedActivities(prevActivities => [...prevActivities, activity]);
    }
  };

  const handleAddGoal = (goal) => {
    const index = selectedGoals.indexOf(goal);
    if (index !== -1) {
      setSelectedGoals(prevGoals => prevGoals.filter(item => item !== goal));
    } else {
      setSelectedGoals(prevGoals => [...prevGoals, goal]);
    }
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    const reqBody = {
      mood,
      bedTime: { wakeTime, sleepTime },
      energyLevel,
      mainFocus: selectedMainFocus,
      activities: selectedActivities,
      goals,
      notes
    };

    axios.post("https://uway-back.onrender.com/logs/dailylogs", reqBody, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`
      }
    })
      .then((response) => {
        navigate("/home");
      })
      .catch((error) => {
        const errorDescription = error.message;
        setError(errorDescription);
      });
  };

  return (
    <Box m="4">
      <Heading textAlign="center" mb={10}>How's your day going?</Heading>
      <form onSubmit={handleSignUpSubmit}>
        {error && <p>{error}</p>}
        <FormControl mb="50px" textAlign="center">
          <FormLabel mb="5" textAlign="center">What is your main focus for today?</FormLabel>
          <SimpleGrid spacing={1} columns="5">
            {showAllFocus
              ? mainFocus.map((focus, index) => (
                  <Box key={index} onClick={() => setSelectedMainFocus(focus.name)}>
                    <IconButton
                      icon={<img src={focus.icon} alt={focus.name} style={{ maxWidth: "80%", maxHeight: "80%" }} />}
                      colorScheme={selectedMainFocus === focus.name ? "green" : "gray"}
                      borderRadius="full"
                    />
                    <Text fontSize="10px">{focus.name}</Text>
                  </Box>
                ))
              : mainFocus.slice(0, 5).map((focus, index) => (
                  <Box key={index} onClick={() => setSelectedMainFocus(focus.name)}>
                    <IconButton
                      icon={<img src={focus.icon} alt={focus.name} style={{ maxWidth: "80%", maxHeight: "80%" }} />}
                      colorScheme={selectedMainFocus === focus.name ? "green" : "gray"}
                      borderRadius="full"
                    />
                    <Text fontSize="10px">{focus.name}</Text>
                  </Box>
                ))}
          </SimpleGrid>
          <Button size='sm' mt="2" onClick={() => setshowAllFocus(!showAllFocus)}>
            {showAllFocus ? "Show Less" : "Show All"}
          </Button>
          <Button size='sm' onClick={()=>navigate('/mainFocus')} mt="2" ml="2">Create new</Button>
        </FormControl>

        <Box mb="50px" textAlign="center">
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
        <FormControl mb="50px" display="flex" flexDirection="column" alignItems="center">
          <FormLabel textAlign="center">How energized do you feel today?</FormLabel>
          <Slider
            width="90%"
            mt="10px"
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

        <FormControl mb="50px" textAlign="center">
          <FormLabel mb="5" textAlign="center">Activities</FormLabel>
          <SimpleGrid spacing={1} columns="5">
            {showAllActivities
              ? activities.map((activity, index) => (
                  <Box key={index} onClick={() => handleAddActivity(activity.name)}>
                    <IconButton
                      icon={<img src={activity.icon} alt={activity.name} style={{ maxWidth: "80%", maxHeight: "80%" }} />}
                      colorScheme={selectedActivities.includes(activity.name) ? "green" : "gray"}
                      borderRadius="full"
                    />
                    <Text fontSize="10px">{activity.name}</Text>
                  </Box>
                ))
              : activities.slice(0, 5).map((activity, index) => (
                  <Box key={index} onClick={() => handleAddActivity(activity.name)}>
                    <IconButton
                      icon={<img src={activity.icon} alt={activity.name} style={{ maxWidth: "80%", maxHeight: "80%" }} />}
                      colorScheme={selectedActivities.includes(activity.name) ? "green" : "gray"}
                      borderRadius="full"
                    />
                    <Text fontSize="10px">{activity.name}</Text>
                  </Box>
                ))}
          </SimpleGrid>
          <Button size='sm' mt="2" onClick={() => setShowAllActivities(!showAllActivities)}>
            {showAllActivities ? "Show Less" : "Show More"}
          </Button>
          <Button size='sm' onClick={()=>navigate('/goals')} mt="2" ml="2">Create new</Button>
        </FormControl>

        <FormControl textAlign="center" mb="50px">
          <FormLabel mb="5" textAlign="center">Goals</FormLabel>
          <SimpleGrid spacing={1} columns="5">
            {showAllGoals
              ? goals.map((goal, index) => (
                  <Box key={index} onClick={() => handleAddGoal(goal.name)}>
                    <IconButton
                      icon={<img src={goal.icon} alt={goal.name} style={{ maxWidth: "80%", maxHeight: "80%" }} />}
                      colorScheme={selectedGoals.includes(goal.name) ? "green" : "gray"}
                      borderRadius="full"
                    />
                    <Text fontSize="10px">{goal.name}</Text>
                  </Box>
                ))
              : goals.slice(0, 5).map((goal, index) => (
                  <Box key={index} onClick={() => handleAddGoal(goal.name)}>
                    <IconButton
                      icon={<img src={goal.icon} alt={goal.name} style={{ maxWidth: "80%", maxHeight: "80%" }} />}
                      colorScheme={selectedGoals.includes(goal.name) ? "green" : "gray"}
                      borderRadius="full"
                    />
                    <Text fontSize="10px">{goal.name}</Text>
                  </Box>
                ))}
          </SimpleGrid>
          <Button size='sm' mt="2" onClick={() => setShowAllGoals(!showAllGoals)}>
            {showAllGoals ? "Show Less" : "Show More"}
          </Button>
          <Button size='sm' onClick={()=>navigate('/goals')} mt="2" ml="2">Create new</Button>
        </FormControl>

        <FormControl textAlign="center" mb="50px">
          <FormLabel mb="5" textAlign="center">Anything about your day</FormLabel>
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
