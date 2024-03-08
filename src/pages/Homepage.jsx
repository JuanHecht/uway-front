import BottomNavBar from "../components/BottomNavbar";
import { Link } from "react-router-dom";
import RoundSlider from "../components/RoundSlider";


function Homepage(){
    return(
        <div>
            <p>Phrase of the day</p>
            <RoundSlider/>
        </div>
    )
}

export default Homepage;