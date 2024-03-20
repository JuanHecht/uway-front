/* import BottomNavBar from "../components/BottomNavbar";
import { Link } from "react-router-dom";
import RoundSlider from "../components/RoundSlider";
import CalendarPreview from "../components/CalendarPreview";
import PhraseOfDay from "../components/PhraseOfDay";
import { useContext } from "react";

import { AuthContext } from "../context/auth.context";
import { Box } from "@chakra-ui/react";


function Homepage(){
    const { user, dailyLogs, todayLog } = useContext(AuthContext);

    return(
        <Box>
            <PhraseOfDay/>
            <CalendarPreview dailyLogs={dailyLogs}/>
            <RoundSlider/>
        </Box>
    )
}

export default Homepage; */
import BottomNavBar from "../components/BottomNavbar";
import { Link } from "react-router-dom";
import RoundSlider from "../components/RoundSlider";
import CalendarPreview from "../components/CalendarPreview";
import PhraseOfDay from "../components/PhraseOfDay";
import DailyLogCard from "../components/DailyLogCard"; // Import DailyLogCard
import { useContext, useState, useEffect } from "react";

import { AuthContext } from "../context/auth.context";
import { Box, Heading, Image, Flex, Text } from "@chakra-ui/react";

import congratulations from '/images/applause.png'


function Homepage() {
    const { user, dailyLogs, todayLog } = useContext(AuthContext);


    return (
        <Box>
            <PhraseOfDay />
            <CalendarPreview dailyLogs={dailyLogs} />
            {todayLog ? null : <RoundSlider />}
            {todayLog &&
                <Box p="10px" bg="yellow.50" mt="25px">
                    <Flex>
                        <Image boxSize='100px'
                            objectFit='cover' 
                            src={congratulations} 
                            mr="10px"/>
                        <Flex justifyContent="center" textAlign="center" direction="column">
                            <Heading textAlign="center" size="md">Wonderful job!</Heading>
                            <Text>Your daily log for today was submitted </Text>
                        </Flex>
                    </Flex>
                    {dailyLogs.map(log => log.createdAt.slice(0, 10) === new Date().toISOString().split('T')[0] && <DailyLogCard dailyLog={log} key={log._id} />)}
                </Box>
            }
        </Box>
    )
}

export default Homepage;
