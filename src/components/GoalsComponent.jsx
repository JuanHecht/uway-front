import axios from "axios";
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
import { UserContext } from "../context/user.context";
import { useContext, useState } from "react";


import categoriesData from "../data/goalsCategories.json";

function GoalsComponent() {
    const { user } = useContext(AuthContext);
    const {goals} = useContext(UserContext);
   
    /* const [goals, setGoals] = useState([]); */
    const [newGoals, setNewGoals] = useState("");
    const [notes, setNotes] = useState("");
    const [recurring, setRecurring] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedIconUrl, setSelectedIconUrl] = useState("");
    const [error, setError] = useState("");

    // Get the goals MIGRATE TO NEW CONTEXT
    /* useEffect(() => {
        axios.get(`https://uway-back.onrender.com/goals/goals/${user._id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`
            }
        })
            .then((response) => setGoals(response.data))
            .catch((error) => console.log(error));
    }, [user._id]); */

    // Posting new goals

   
    const handleNewActivitesSubmit = () => {
        const reqBody = {
            name: newGoals,
            category: selectedCategory,
            notes: notes,
            recurring: recurring,
            icon: selectedIconUrl
        };

        axios.post("https://uway-back.onrender.com/goals/add-goals", reqBody, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`
            }
        })
            .then((response) => {
                // handle success
                setNewGoals("");
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
            <Heading mb="10px" textAlign="left" size="lg">Goals</Heading>
            {goals.map((focus) => (
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
            <Box marginBottom={30}>
                <Text fontSize="20px" mt="30px" mb="15px" fontWeight="600" >Add a goal</Text>
               
                
                        <Box mb="10px">
                            <label style={{ fontWeight: "500", marginBottom: "10px" }} htmlFor="newGoals">New Goal</label>
                            <Input
                                mt="10px"
                                type="text"
                                id="newGoals"
                                value={newGoals}
                                onChange={(e) => setNewGoals(e.target.value)}
                            />
                        </Box>
                        <Box mb="10px">
                            <label style={{ fontWeight: "500", marginBottom: "10px" }} htmlFor="category">Category:</label>
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
                        <Box mb="10px">
                            <label style={{ fontWeight: "500", marginBottom: "10px" }} htmlFor="notes">What does your goal consist in?</label>
                            <Input
                                mt="10px"
                                type="text"
                                id="notes"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                            />
                        </Box>
                        <Box mb="10px">
                            <label style={{ fontWeight: "500", marginBottom: "10px" }} htmlFor="recurring">How often do you plan to work on this goal?</label>
                            <Select
                                mt="10px"
                                name="recurring"
                                id="recurring"
                                value={recurring}
                                onChange={(e) => setRecurring(e.target.value)}
                            >
                                <option value="">Select Frequency</option>
                                <option value={1}>Once a week</option>
                                <option value={2}>Twice a week</option>
                                <option value={3}>Three times a week</option>
                                <option value={4}>Four times a week</option>
                                <option value={5}>Five times a week</option>
                                <option value={6}>Six times a week</option>
                                <option value={7}>Seven times a week</option>
                            </Select>
                        </Box>
                        <Button mb="50px" mt="10px" bg="black" color="white" onClick={handleNewActivitesSubmit}>Submit</Button>
                   
            </Box>
        </Box>
    );
}

export default GoalsComponent;


