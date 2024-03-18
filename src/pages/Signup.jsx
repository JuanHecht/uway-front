import axios from 'axios';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Box, Heading, FormControl, FormLabel, Input, Button, Text, Image, Link as ChakraLink } from '@chakra-ui/react';

function SignUp() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [passwordInstruction, setPasswordInstruction] = useState("");

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
                /* const errorDescription = error.response.data.message; */
                setError(error.response.data.message);
            });
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        if (e.target.value === "") {
            setPasswordInstruction("");
        } else {
            setPasswordInstruction("Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.");
        }
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
                    <Box textAlign="left">
                    <Text color="gray.600" fontSize="sm">{passwordInstruction}</Text>
                </Box>
                    <Input
                        type="password"
                        name="password"
                        value={password}
                        /* onChange={(e) => setPassword(e.target.value)} */
                        onChange={handlePasswordChange}
                        placeholder="Enter your password"
                    />
                </FormControl>
                {error && <Text mt="15px" color="red" textAlign="center">{error}</Text>}
                <Button type="submit" mt={5} w="100%" bg="black" color="white">Sign Up</Button>

                <Box textAlign="center" mt={5}>
                    <Text color="grey">Already have an Account? </Text>
                    <ChakraLink href="/login" color="black.500" textDecoration="underline" >
                        Login
                    </ChakraLink>
                </Box>
            </form>
        </Box>

    )
}

export default SignUp;
