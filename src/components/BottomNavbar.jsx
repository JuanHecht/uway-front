import React from 'react';
import { Box, Flex, Icon, IconButton, Text } from '@chakra-ui/react';
import { FaHome, FaUser } from 'react-icons/fa';
import { GiStairsGoal } from "react-icons/gi"
import { GoGoal } from "react-icons/go"
import { Link } from 'react-router-dom';

const BottomNavBar = () => {
  return (
    <Flex
   /*  height= "45px" */
    height="8%"
    bottom="0"
    /* top="90vh" */
    left="0"
    right="0"
    zIndex="9999"
    bg="#f4eae3"
    color="black"
    position= "fixed"
    justifyContent="space-around"
    
>
      

      <Box>
      <Link to={"/"}>
        <IconButton
          aria-label="Home"
          icon={<Icon as={FaHome} boxSize={9} />}
          variant="ghost"
          size="lg"
          height ="10px"
          mt="5px"
        />
        <Text fontSize="10px" mt="6px">Home</Text>
        </Link>
      </Box>
      <Box>
      <Link to={"/dailylog/id"}>
        <IconButton
          aria-label="Journey"
          icon={<Icon as={GiStairsGoal} boxSize={7}  />}
          variant="ghost"
          size="lg"
          height ="10px"
          mt="5px"
        />
        <Text fontSize="10px" mt="6px">Joruney</Text>
        </Link>
      </Box>
      <Box>
      <Link to={"/goals"}>
        <IconButton
          aria-label="Goals"
          icon={<Icon as={GoGoal} boxSize={7}  />}
          variant="ghost"
          size="lg"
          height ="10px"
          mt="5px"
        />
        <Text fontSize="10px" mt="6px">Goals</Text>
        </Link>
      </Box>
      <Box>
      <Link to={"/profile"}>
        <IconButton
          aria-label="Profile"
          icon={<Icon as={FaUser} boxSize={7} />}
          variant="ghost"
          size="lg"
          height ="10px"
          mt="5px"
        />
        <Text fontSize="10px" mt="6px">Profile</Text>
        </Link>
      </Box>
    </Flex>
  );
};

export default BottomNavBar;

