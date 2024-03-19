/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import axios from "axios";

// Initializing Context
const AuthContext = React.createContext();

const API_URL = "https://uway-back.onrender.com";

function AuthProviderWrapper(props) {
  const [user, setUser] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [moodNum, setMoodNum] = useState(null);
  const [dailyLogs, setDailyLogs] = useState([]);
  const [todayLog, setTodayLog] = useState(false);

  /* Save the Login's JWT Token in our Browser' Storage */
  const saveToken = (token) => {
    localStorage.setItem("authToken", token);
  };

  /* Function that authenticates the user --> verifies if the token is a valid one. */
  const authenticateUser = () => {
    setIsLoading(true);
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      axios
        .get(`${API_URL}/auth/verify`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          setUser(response.data);
          setIsLoggedIn(true);
          setIsLoading(false);
        })
        .catch(() => {
          setUser(null);
          setIsLoggedIn(false);
          setIsLoading(false);
        })
    }
    else {
      setUser(null);
      setIsLoggedIn(false);
    }
  };

  const removeToken = () => {
    localStorage.removeItem("authToken");
  }

  const logOut = () => {
    removeToken();
    authenticateUser();
  }

  useEffect(() => {
    authenticateUser();
  }, []);



  /* useEffect(() => {
      if (user && user._id) { // Check if user and user._id are defined
          axios.get(`https://uway-back.onrender.com/logs/dailylogs/${user._id}`, {
              headers: {
                  Authorization: `Bearer ${localStorage.getItem("authToken")}`
              }
          })
              .then((response) => setDailyLogs(response.data))
              .catch((error) => console.log(error));
      }
  }, [user]); */
  useEffect(() => {
    if (user && user._id) {
      axios.get(`https://uway-back.onrender.com/logs/dailylogs/${user._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`
        }
      })
        .then((response) => {
          setDailyLogs(response.data);
          // Check if a log exists for today
          const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
          const foundTodayLog = response.data.some(log => {
            const logDate = log.createdAt.split('T')[0]; // Extract the date part from createdAt
            return logDate === today;
          });
          setTodayLog(foundTodayLog);
        })
        .catch((error) => console.log(error));
    }
  }, [user, dailyLogs]);


  const getMoodAndImageUrl = (value) => {
    let mood, imageUrl, moodNum;

    if (value < 20) {
      setMoodNum(1);
      mood = "Very sad";
      imageUrl = "/images/verysad_360.png";
    } else if (value >= 20 && value <= 40) {
      setMoodNum(2);
      mood = "Sad";
      imageUrl = "/images/sad_360.png";
    } else if (value > 40 && value <= 60) {
      setMoodNum(3);
      mood = "Normal";
      imageUrl = "/images/normal_360.png";
    } else if (value > 60 && value <= 80) {
      setMoodNum(4);
      mood = "Happy";
      imageUrl = "/images/happy_360.png";
    } else {
      setMoodNum(5);
      mood = "Very happy";
      imageUrl = "/images/veryhappy_360.png";
    }
    return { mood, moodNum, imageUrl };
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, isLoading, getMoodAndImageUrl, moodNum, user, saveToken, authenticateUser, logOut, dailyLogs, todayLog }}>
      {props.children}
    </AuthContext.Provider>
  )
}


export { AuthProviderWrapper, AuthContext };