/* Import React / React-Router-Dom Features  */
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Heading, FormControl, FormLabel, Input, Button, Text, Image, Link as ChakraLink} from '@chakra-ui/react';

/* Import Context */
import { AuthContext } from "../context/auth.context";

/* Import Axios */
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { saveToken, authenticateUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    const reqBody = { email, password };

    axios
      .post("https://uway-back.onrender.com/auth/login", reqBody)
      .then((response) => {
        saveToken(response.data.authToken);
        authenticateUser();
        navigate("/home");
      })
      .catch((error) => {
        const errorDescription = error.data.message;
        setError(errorDescription);
      });
  };

  return (
    <Box p={4} maxW="375px" h="600px" m="auto">
      <Heading as="h1" fontSize="2xl" textAlign="center" mt={2}>Login</Heading>
      <Box mt={4} textAlign="center">
        <Image src="/images/login.png" maxW="50%" mx="auto" />
      </Box>
      <form onSubmit={handleLoginSubmit}>
        <FormControl mt={4}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </FormControl>
        <Button type="submit" mt={5} w="100%" bg="black" color="white">Login</Button>
        {error && <Text color="red.500" mt={2}>{error}</Text>}
        <Box textAlign="center" mt={5}>
          <Text color="grey">Don't have an Account? </Text>
          <ChakraLink  href="/signup" color="black.500" textDecoration="underline" >
            Sign Up
          </ChakraLink>
        </Box>
      </form>
    </Box>
  );
}

export default Login;
