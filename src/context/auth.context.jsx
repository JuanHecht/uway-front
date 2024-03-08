/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import axios from "axios";

// Initializing Context
const AuthContext = React.createContext();

const API_URL = "http://localhost:5005";

function AuthProviderWrapper(props) {
  const [user, setUser] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  /* Save the Login's JWT Token in our Browser' Storage */
  const saveToken = (token) => {
    localStorage.setItem("authToken", token);
  };

  /* Function that authenticates the user --> verifies if the token is a valid one. */
  const authenticateUser = () => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      axios
        .get(`${API_URL}/auth/verify`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          setUser(response.data);
          setIsLoggedIn(true);
        })
        .catch(()=>{
          setUser(null);
          setIsLoggedIn(false);
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
      moodNum = 1
      mood = "Very sad";
      imageUrl = "/images/verysad_360.png";
    } else if (value >= 15 && value <= 35) {
      moodNum = 2
      mood = "Sad";
      imageUrl = "/images/sad_360.png";
    } else if (value > 35 && value <= 65) {
      moodNum = 3
      mood = "Normal";
      imageUrl = "/images/normal_360.png";
    } else if (value > 65 && value <= 90) {
      moodNum = 4
      mood = "Happy";
      imageUrl = "/images/happy_360.png";
    } else {
      moodNum = 5
      mood = "Very happy";
      imageUrl = "/images/veryhappy_360.png";
    }
    return { mood, moodNum, imageUrl };
  };

  return(
    <AuthContext.Provider value={{isLoggedIn, getMoodAndImageUrl, user, saveToken, authenticateUser, logOut}}>
        {props.children}
    </AuthContext.Provider>
  )
}


export {AuthProviderWrapper, AuthContext};