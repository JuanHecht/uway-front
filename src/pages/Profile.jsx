/* import { useContext } from "react";
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


export default Profile; */

import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Button, Link, Text, Box , Image} from "@chakra-ui/react";

function Profile(){
    const {user, logOut} = useContext(AuthContext)
    return(
        <Box mt= "50px" display="flex" flexDirection="column" alignItems="center">
        <Text textAlign="center" fontWeight="bold"> {user.name} this is your profile settings </Text>
        <Box mt={4} textAlign="center">
        <Image src="/images/login.png" maxW="50%" mx="auto" />
      </Box>
        <Link  href="/"><Button onClick={logOut} textAlign="center"  mt="20px">Log out</Button></Link>
      </Box>
    )
}

export default Profile;