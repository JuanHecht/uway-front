/* import { useState, useContext } from "react";
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


  const navigate = useNavigate();

  const handleAddActivity = (activity) => {
    const index = selectedActivities.indexOf(activity);
    if (index !== -1) {
      // Activity already selected, remove it
      setSelectedActivities(prevActivities => prevActivities.filter(item => item !== activity));
    } else {
      // Activity not selected, add it
      setSelectedActivities(prevActivities => [...prevActivities, activity]);
    }
  };

  const handleAddGoal = (goal) => {
    const index = selectedGoals.indexOf(goal);
    if (index !== -1) {
      // Activity already selected, remove it
      setSelectedGoals(prevGoals => prevGoals.filter(item => item !== goal));
    } else {
      // Activity not selected, add it
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

    axios.post("https://uway-back.onrender.com//logs/dailylogs", reqBody, {
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
                  icon={<img src={focus.icon} alt={focus.name} style={{ maxWidth: "80%", maxHeight: "80%" }} />}
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

        <FormControl>
          <FormLabel>Activities</FormLabel>
          <HStack spacing={4}>
            {activities.map((activity, index) => (
              <Box key={index} onClick={() => handleAddActivity(activity.name)}>
                <IconButton
                  icon={<img src={activity.icon} alt={activity.name} style={{ maxWidth: "80%", maxHeight: "80%" }} />}
                  colorScheme={selectedActivities.includes(activity.name) ? "green" : "gray"}
                  borderRadius="full"
                />
                <Text fontSize="10px">{activity.name}</Text>
              </Box>
            ))}
          </HStack>
        </FormControl>

        <FormControl>
          <FormLabel>Goals</FormLabel>
          <HStack spacing={4}>
            {goals.map((goal, index) => (
              <Box key={index} onClick={() => handleAddGoal(goal.name)}>
                <IconButton
                  icon={<img src={goal.icon} alt={goal.name} style={{ maxWidth: "80%", maxHeight: "80%" }} />}
                  colorScheme={selectedGoals.includes(goal.name) ? "green" : "gray"}
                  borderRadius="full"
                />
                <Text fontSize="10px">{goal.name}</Text>
              </Box>
            ))}
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

export default DailyLogInput; */


/* import React, { useState, useContext } from "react";
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
  SimpleGrid // Import SimpleGrid from Chakra UI
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
  const [showAllActivities, setShowAllActivities] = useState(false); // Track whether to show all activities or not

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

    axios.post("https://uway-back.onrender.com//logs/dailylogs", reqBody, {
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
                  icon={<img src={focus.icon} alt={focus.name} style={{ maxWidth: "80%", maxHeight: "80%" }} />}
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

        <FormControl>
          <FormLabel>Activities</FormLabel>
          <SimpleGrid  columns="5" spacing={4}>
            {activities.map((activity, index) => (
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
          <Button onClick={() => setShowAllActivities(!showAllActivities)}>
            {showAllActivities ? "Show Less" : "Show More"}
          </Button>
        </FormControl>

        <FormControl>
          <FormLabel>Goals</FormLabel>
          <HStack spacing={4}>
            {goals.map((goal, index) => (
              <Box key={index} onClick={() => handleAddGoal(goal.name)}>
                <IconButton
                  icon={<img src={goal.icon} alt={goal.name} style={{ maxWidth: "80%", maxHeight: "80%" }} />}
                  colorScheme={selectedGoals.includes(goal.name) ? "green" : "gray"}
                  borderRadius="full"
                />
                <Text fontSize="10px">{goal.name}</Text>
              </Box>
            ))}
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
 */
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
  Heading
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

    axios.post("https://uway-back.onrender.com//logs/dailylogs", reqBody, {
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
                  icon={<img src={focus.icon} alt={focus.name} style={{ maxWidth: "80%", maxHeight: "80%" }} />}
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

        <FormControl>
          <FormLabel>Activities</FormLabel>
          <HStack spacing={4}>
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
          </HStack>
          <Button onClick={() => setShowAllActivities(!showAllActivities)}>
            {showAllActivities ? "Show Less" : "Show More"}
          </Button>
        </FormControl>

        <FormControl>
          <FormLabel>Goals</FormLabel>
          <HStack spacing={4}>
            {goals.map((goal, index) => (
              <Box key={index} onClick={() => handleAddGoal(goal.name)}>
                <IconButton
                  icon={<img src={goal.icon} alt={goal.name} style={{ maxWidth: "80%", maxHeight: "80%" }} />}
                  colorScheme={selectedGoals.includes(goal.name) ? "green" : "gray"}
                  borderRadius="full"
                />
                <Text fontSize="10px">{goal.name}</Text>
              </Box>
            ))}
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
