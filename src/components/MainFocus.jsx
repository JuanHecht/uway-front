import axios from "axios";
import { useState, useEffect, useContext } from "react";

import { AuthContext } from "../context/auth.context";
import { UserContext } from '../context/user.context'


import categoriesData from "../data/mainFocusCategories.json";
import {
    Box,
    Flex,
    Text,
    Input,
    Select,
    Button,
    Image,
    Heading,
    Card,
    CardBody,
    IconButton,
    SimpleGrid
  } from "@chakra-ui/react";

function MainFocus() {
    const { user } = useContext(AuthContext);
    const {mainFocus} = useContext(UserContext)
    /* const [mainFocus, setMainFocus] = useState([]); */
    const [newMainFocus, setNewMainFocus] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedIconUrl, setSelectedIconUrl] = useState("");
    const [error, setError] = useState("");

    // Get the mainfocuses MIGRATE TO NEW CONTEXT
    /* useEffect(() => {
        axios.get(`https://uway-back.onrender.com/goals/mainfocus/${user._id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`
            }
        })
            .then((response) => setMainFocus(response.data))
            .catch((error) => console.log(error));
    }, [user._id]); */

    // Posting new mainfocuses

    const handleNewMainFocusSubmit = () => {
        const reqBody = {
            name: newMainFocus,
            category: selectedCategory,
            icon: selectedIconUrl
        };

        axios.post("https://uway-back.onrender.com/goals/add-mainfocus", reqBody, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`
            }
        })
            .then((response) => {
                // handle success
                setNewMainFocus("");
                setSelectedCategory("");
                setSelectedIconUrl("");
                navigate("/profile");
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
        
          <Heading mb="10px" textAlign="left" size="lg">Main focuses</Heading>
          
          <Box display="flex" justifyContent="space-around">
          {mainFocus.map((focus) => (
            <Box key={focus._id} p="0" ml="10px" display="flex" alignItems="center" flexDirection="column">
               <Box>
              <IconButton
                      icon={<img src={focus.icon} alt={focus.name} style={{ maxWidth: "80%", maxHeight: "80%" }} />}
                      borderRadius="full"
                    />
                    </Box>
                    <Box>
                    <Text fontSize="10px">{focus.name}</Text>
                    </Box>
            </Box>
            
          ))}
          </Box>
         
        

        <Box marginBottom={30}>
          <Text fontSize="20px" mt="30px" mb="15px" fontWeight="600">What helps you focus?</Text >
          <Box mb="10px">
            <label style={{fontWeight:"500", marginBottom:"10px"}}  htmlFor="newMainFocus">New Main Focus:</label>
            <Input
            mt="10px"
              type="text"
              id="newMainFocus"
              value={newMainFocus}
              onChange={(e) => setNewMainFocus(e.target.value)}
            />
          </Box>
          <Box mb="10px">
            <label style={{fontWeight:"500", marginBottom:"10px"}} htmlFor="category">Category:</label>
            <Select
            mt="10px"
              id="category"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="">Select a category</option>
              {categoriesData.map((category, index) => (
                <option key={index} value={category.category}>{category.category}</option>
              ))}
            </Select>
          </Box>
          <Button mt="10px" bg="black" color="white" onClick={handleNewMainFocusSubmit}>Submit</Button>
        </Box>
      </Box>
    );
}

export default MainFocus;


