import BottomNavBar from "../components/BottomNavbar";
import { Link } from "react-router-dom";
import RoundSlider from "../components/RoundSlider";
import CalendarPreview from "../components/CalendarPreview";
import PhraseOfDay from "../components/PhraseOfDay";
import { useContext } from "react";

import { AuthContext } from "../context/auth.context";
import { Box } from "@chakra-ui/react";


function Homepage(){
    const { user, dailyLogs } = useContext(AuthContext);

    return(
        <Box>
            <PhraseOfDay/>
            <CalendarPreview dailyLogs={dailyLogs}/>
            <RoundSlider/>
        </Box>
    )
}

export default Homepage;