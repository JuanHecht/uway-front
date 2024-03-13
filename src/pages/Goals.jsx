import MainFocus from "../components/MainFocus";
import Activites from "../components/Activites";
import GoalsComponent from "../components/GoalsComponent";

function Goals(){
    return(
        <div>
            <h1>How you live your days is how you live your life</h1>
            <h3>Your purpose is within yourself, but we'll help you find it</h3>
            <MainFocus/>
            <h1>Your daily activities shape your day</h1>
            <h3>To help you track them add your recurring activities</h3>
            <Activites/>
            <h1>Now let's set your goals</h1>
            <h3>Some examples of goals can be to achieve something like read a book, or to quit a habit like quit smoking</h3>
            <GoalsComponent/>
        </div>
    )
}
export default Goals;