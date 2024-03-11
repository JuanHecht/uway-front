/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import axios from "axios";

// Initializing Context
const AuthContext = React.createContext();

const API_URL = "http://localhost:5005";

function AuthProviderWrapper(props) {
  const [user, setUser] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [moodNum, setMoodNum] = useState(null);

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
        .catch(()=>{
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

  const removeToken = () =>{
    localStorage.removeItem("authToken");
  }

  const logOut = () =>{
    removeToken();
    authenticateUser();
  }

   useEffect(() => {
     authenticateUser();
   }, []);

   const getMoodAndImageUrl = (value) => {
    let mood, imageUrl, moodNum;

    if (value < 15) {
      setMoodNum(1);
      mood = "Very sad";
      imageUrl = "/images/verysad_360.png";
    } else if (value >= 15 && value <= 35) {
      setMoodNum(2);
      mood = "Sad";
      imageUrl = "/images/sad_360.png";
    } else if (value > 35 && value <= 65) {
      setMoodNum(3);
      mood = "Normal";
      imageUrl = "/images/normal_360.png";
    } else if (value > 65 && value <= 90) {
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

  return(
    <AuthContext.Provider value={{isLoggedIn, isLoading, getMoodAndImageUrl, moodNum,  user, saveToken, authenticateUser, logOut}}>
        {props.children}
    </AuthContext.Provider>
  )
}


export {AuthProviderWrapper, AuthContext};