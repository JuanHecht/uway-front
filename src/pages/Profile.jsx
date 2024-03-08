import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function Profile(){
    const {user, logOut} = useContext(AuthContext)
    return(
        <div>
            <p>Hello user we will put your name here {user.name}{user._id}</p>
            <button onClick={logOut}>Log Out</button>
        </div>
    )
}

export default Profile;