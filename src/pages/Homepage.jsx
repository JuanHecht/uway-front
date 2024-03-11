import BottomNavBar from "../components/BottomNavbar";
import { Link } from "react-router-dom";
import RoundSlider from "../components/RoundSlider";
import CalendarPreview from "../components/CalendarPreview";
import { useContext } from "react";

import { AuthContext } from "../context/auth.context";


function Homepage(){
    const { user, dailyLogs } = useContext(AuthContext);

    return(
        <div>
            <p>Phrase of the day</p>
            <CalendarPreview dailyLogs={dailyLogs}/>
            <RoundSlider/>
        </div>
    )
}

export default Homepage;