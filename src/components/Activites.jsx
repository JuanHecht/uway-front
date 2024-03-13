import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import categoriesData from "../data/activitiesCategories.json";

function Activites() {
    const { user } = useContext(AuthContext);
    const [activities, setActivites] = useState([]);
    const [newActivites, setNewActivites] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedIconUrl, setSelectedIconUrl] = useState("");
    const [error, setError] = useState("");
    
    // Get the activities MIGRATE TO NEW CONTEXT
    useEffect(() => {
        axios.get(`http://localhost:5005/goals/activities/${user._id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`
            }
        })
        .then((response) => setActivites(response.data))
        .catch((error) => console.log(error));
    }, [user._id]);

    // Posting new activities

    const handleNewActivitesSubmit = () => {
        const reqBody = {
            name: newActivites,
            category: selectedCategory,
            icon: selectedIconUrl
        };

        axios.post("http://localhost:5005/goals/add-activities", reqBody, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`
            }
        })
        .then((response) => {
            // handle success
            setNewActivites("");
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
        <div style={{backgroundColor: "grey"}}>
            <div>
                <h1>Main focuses</h1>
                {activities.map((focus) => (
                    <div style={{display: "flex", backgroundColor: "lightgray", marginBottom: "10px"}} key={focus._id}>
                        <h2>{focus.name}</h2>
                        <img style={{height: 50}} src={focus.icon} alt={focus.name} />
                        <a href={focus.icon}></a>
                    </div>
                ))}
            </div>
            <div style={{ marginBottom: 70 }}>
                <h1>Add new main focus</h1>
                <div>
                    <label htmlFor="newActivites">New Main Focus:</label>
                    <input
                        type="text"
                        id="newActivites"
                        value={newActivites}
                        onChange={(e) => setNewActivites(e.target.value)}
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
                <button onClick={handleNewActivitesSubmit}>Submit</button>
            </div>
        </div>
    );
}

export default Activites;


