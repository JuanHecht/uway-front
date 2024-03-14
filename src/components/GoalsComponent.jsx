import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { UserContext } from "../context/user.context";

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
        axios.get(`https://uway-back.onrender.com//goals/goals/${user._id}`, {
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

        axios.post("https://uway-back.onrender.com//goals/add-goals", reqBody, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`
            }
        })
            .then((response) => {
                // handle success
                setNewGoals("");
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
                <h1>Goals</h1>
                {goals.map((focus) => (
                    <div style={{ display: "flex", backgroundColor: "lightgray", marginBottom: "10px" }} key={focus._id}>
                        <h2>{focus.name}</h2>
                        <img style={{ height: 50 }} src={focus.icon} alt={focus.name} />
                        <a href={focus.icon}></a>
                    </div>
                ))}
            </div>
            <div style={{ marginBottom: 70 }}>
                <h1>Add new main focus</h1>
                <div>
                    <label htmlFor="newGoals">New Goal</label>
                    <input
                        type="text"
                        id="newGoals"
                        value={newGoals}
                        onChange={(e) => setNewGoals(e.target.value)}
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
                <div>
                    <label htmlFor="notes">What does your goal consist in?</label>
                    <input
                        type="text"
                        id="notes"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="recurring">How often do you plan to work on this goal?</label>
                    <select
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
                    </select>
                </div>

                <button onClick={handleNewActivitesSubmit}>Submit</button>
            </div>
        </div>
    );
}

export default GoalsComponent;


