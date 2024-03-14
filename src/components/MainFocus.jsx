import axios from "axios";
import { useState, useEffect, useContext } from "react";

import { AuthContext } from "../context/auth.context";
import { UserContext } from '../context/user.context'


import categoriesData from "../data/mainFocusCategories.json";
import { Flex, Avatar, Box, Text } from '@chakra-ui/react';

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
        axios.get(`https://uway-back.onrender.com//goals/mainfocus/${user._id}`, {
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

        axios.post("https://uway-back.onrender.com//goals/add-mainfocus", reqBody, {
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
        <div style={{ backgroundColor: "grey" }}>
            <div>
                <h1>Main focuses</h1>
                {mainFocus.map((focus) => (
                    <Flex key={focus._id} direction="column" textAlign="center" justifyContent="center" alignItems="center" width="fit-content">
                        <Box
                            width="25px"
                            height="25px"
                            borderRadius="50%"
                            overflow="hidden"
                            backgroundColor="lightblue"
                            padding="3px"
                        >
                            <img
                                src={focus.icon}
                                alt="Focus Icon"
                                style={{ width: "100%", height: "100%" }}
                            />
                        </Box>
                        <Box ml='2'>
                            <Text fontWeight='bold'>
                                {focus.name}
                            </Text>
                        </Box>
                    </Flex>
                ))}
                {/* <div style={{display: "flex", backgroundColor: "lightgray", marginBottom: "10px"}} key={focus._id}>
                        <h2>{focus.name}</h2>
                        <img style={{height: 50}} src={focus.icon} alt={focus.name} />
                        <a href={focus.icon}></a>
                    </div> */}

            </div>
            <div style={{ marginBottom: 70 }}>
                <h1>Add new main focus</h1>
                <div>
                    <label htmlFor="newMainFocus">New Main Focus:</label>
                    <input
                        type="text"
                        id="newMainFocus"
                        value={newMainFocus}
                        onChange={(e) => setNewMainFocus(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="category">Category:</label>
                    <select
                        id="category"
                        value={selectedCategory}
                        /* onChange={(e) => setSelectedCategory(e.target.value)} */
                        onChange={handleCategoryChange}
                    >
                        <option value="">Select a category</option>
                        {categoriesData.map((category, index) => (
                            <option key={index} value={category.category}>{category.category}</option>
                        ))}
                    </select>
                </div>
                <button onClick={handleNewMainFocusSubmit}>Submit</button>
            </div>
        </div>
    );
}

export default MainFocus;


