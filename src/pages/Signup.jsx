import axios from 'axios';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Box, Heading, FormControl, FormLabel, Input, Button, Text, Image, Link as ChakraLink} from '@chakra-ui/react';

function SignUp() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSignUpSubmit = (e) => {
        e.preventDefault();
        const reqBody = { email, password, name };
        axios
          .post("https://uway-back.onrender.com/auth/signup", reqBody)
          .then(() => {
            navigate("/login");
          })
          .catch((error) => {
            const errorDescription = error.data.message;
            setError(errorDescription);
          });
      };

    return (
        <Box p={2} maxW="375px" h="600px" m="auto">
        <Heading as="h1" fontSize="2xl" textAlign="center" mt={2}>Sign Up</Heading>
        <Box mt={2} textAlign="center">
          <Image src="/images/login.png" maxW="40%" mx="auto" />
        </Box>
        <form onSubmit={handleSignUpSubmit}>
        <FormControl mt={2}>
            <FormLabel>Name</FormLabel>
            <Input
              type="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your Username"
            />
          </FormControl>
          <FormControl mt={2}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </FormControl>
          <FormControl mt={2}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </FormControl>
          <Button type="submit" mt={5} w="100%" bg="black" color="white">Sign Up</Button>
         
          <Box textAlign="center" mt={5}>
            <Text color="grey">Already have an Account? </Text>
            <ChakraLink  href="/login" color="black.500" textDecoration="underline" >
              Login
            </ChakraLink>
          </Box>
        </form>
      </Box>
       
    )
}

export default SignUp;
