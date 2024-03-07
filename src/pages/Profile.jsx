import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function Profile(){
    const {user} = useContext(AuthContext)
    return(
        <div>
            <h1>Hello user we will put your name here {user.name}{user._id}</h1>
        </div>
    )
}

export default Profile;