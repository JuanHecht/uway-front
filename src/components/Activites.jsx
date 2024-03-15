import axios from "axios";
import { useState, useEffect, useContext } from "react";
import {
    Box,
    Flex,
    Heading,
    Input,
    Select,
    Button,
    IconButton,
    Text,
    Wrap
  } from '@chakra-ui/react'


import { AuthContext } from "../context/auth.context";
import { UserContext } from  "../context/user.context";

import categoriesData from "../data/activitiesCategories.json";

function Activites() {
    const { user } = useContext(AuthContext);
    const { activities } = useContext(UserContext);
    /* const [activities, setActivites] = useState([]); */
    const [newActivites, setNewActivites] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedIconUrl, setSelectedIconUrl] = useState("");
    const [error, setError] = useState("");
    
    // Get the activities MIGRATE TO NEW CONTEXT
    /* useEffect(() => {
        axios.get(`https://uway-back.onrender.com/goals/activities/${user._id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`
            }
        })
        .then((response) => setActivites(response.data))
        .catch((error) => console.log(error));
    }, [user._id]); */

    // Posting new activities

    const handleNewActivitesSubmit = () => {
        const reqBody = {
            name: newActivites,
            category: selectedCategory,
            icon: selectedIconUrl
        };

        axios.post("https://uway-back.onrender.com/goals/add-activities", reqBody, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`
            }
        })
        .then((response) => {
            // handle success
            setNewActivites("");
            setSelectedCategory("");
            setSelectedIconUrl("");
            navigate("/goals");
        })
        .catch((error) => {
            // handle error
            const errorDescription = error.message;
            setError(errorDescription);
        });
    };

    const handleCategoryChange = (e) => {
        const selectedCategoryData = categoriesData.find(category => category.category === e.target.value);
        if (selectedCategoryData) {
            setSelectedCategory(e.target.value);
            setSelectedIconUrl(selectedCategoryData.iconUrl);
        }
    };

    return (
        <Box m="4">
  <Heading mb="10px" textAlign="left" size="lg">Activities</Heading>
  <Wrap spacing="10px" p="0" justify="center">
  {activities.map((focus) => (
    <Box key={focus._id} p="0"  display="flex" alignItems="center" flexDirection="column">
      <Box display="block" textAlign="center">
        <IconButton
          icon={<img src={focus.icon} alt={focus.name} style={{ maxWidth: "80%", maxHeight: "80%" }} />}
          borderRadius="full"
        />
      </Box>
      <Box display="block" textAlign="center">
        <Text fontSize="10px">{focus.name}</Text>
      </Box>
    </Box>
  ))}
</Wrap>
  <Box marginBottom={30}>
  <Text fontSize="20px" mt="30px" mb="15px" fontWeight="600">Add an activity</Text >
  <Box mb="10px">
            <label style={{fontWeight:"500", marginBottom:"10px"}}  htmlFor="newActivites">New Activity</label>
            <Input
            mt="10px"
              type="text"
              id="newActivites"
              value={newActivites}
              onChange={(e) => setNewActivites(e.target.value)}
            />
          </Box>
    <Box mb="10px">
   
      <label style={{fontWeight:"500", marginBottom:"10px"}} htmlFor="category">Category</label>
      <Select
       mt="10px"
        id="category"
        value={selectedCategory}
        onChange={handleCategoryChange}
        placeholder="Select a category"
      >
        {categoriesData.map((category, index) => (
          <option key={index} value={category.category}>
            {category.category}
          </option>
        ))}
      </Select>
    </Box>
    <Button  mt="10px" bg="black" color="white" onClick={handleNewActivitesSubmit}>Submit</Button>
  </Box>
</Box>
    );
}

export default Activites;

 

