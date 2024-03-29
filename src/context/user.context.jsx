/* eslint-disable react/prop-types */
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import { AuthContext } from "../context/auth.context";

// Initializing Context
const UserContext = React.createContext();

/* const API_URL = "https://uway-back.onrender.com"; */

function UserProviderWrapper(props) {
  const { user } = useContext(AuthContext);
  const [mainFocus, setMainFocus] = useState([]);
  const [activities, setActivites] = useState([]);
  const [goals, setGoals] = useState([]);

  // Get mainfocuses
  useEffect(() => {
    if (user && user._id) {
      axios.get(`https://uway-back.onrender.com/goals/mainfocus/${user._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`
        }
      })
        .then((response) => setMainFocus(response.data))
        .catch((error) => console.log(error));
    }
  }
  , [user, mainFocus]);

  // Get activites
  useEffect(() => {
    if (user && user._id) {
      axios.get(`https://uway-back.onrender.com/goals/activities/${user._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`
        }
      })
        .then((response) => setActivites(response.data))
        .catch((error) => console.log(error));
    }
  }, [user, /* activities */]);

  // Get Goals
  useEffect(() => {
    if (user && user._id) {
      axios.get(`https://uway-back.onrender.com/goals/goals/${user._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`
        }
      })
        .then((response) => setGoals(response.data))
        .catch((error) => console.log(error));
    }
  }, [user, /* goals */]);


  return (
    <UserContext.Provider value={{ mainFocus, activities, goals }}>
      {props.children}
    </UserContext.Provider>
  )
}


export { UserProviderWrapper, UserContext };