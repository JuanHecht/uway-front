import React, { useEffect, useState } from "react";
import phraseData from "../data/phraseOfDay.json";
import { CardBody, Card, Text, Flex } from "@chakra-ui/react";
import { ImLibrary } from "react-icons/im";

function getRandomPhraseIndex() {
    return Math.floor(Math.random() * phraseData.length);
}

function PhraseOfDay() {
    // State to hold the selected phrase index
    const [selectedPhraseIndex, setSelectedPhraseIndex] = useState(null);

    useEffect(() => {
        // Check if a phrase index is already stored in local storage
        const storedIndex = localStorage.getItem("selectedPhraseIndex");
        if (storedIndex !== null) {
            setSelectedPhraseIndex(parseInt(storedIndex));
        } else {
            // If no index is stored, generate a new random index and store it
            const randomIndex = getRandomPhraseIndex();
            setSelectedPhraseIndex(randomIndex);
            localStorage.setItem("selectedPhraseIndex", randomIndex);
        }
    }, []);

    // Get the selected phrase
    const selectedPhrase = selectedPhraseIndex !== null ? phraseData[selectedPhraseIndex].phrase : "";

    return (
        <Card pt="0" height="50px" bg="#f4eae3" textAlign="center" m="5px" mb="20px" >
            <CardBody p="0" bg="">
                <Flex alignItems="center" justifyContent="center">
                    <ImLibrary />
                    <Text ml="10px" fontSize="lg">Phrase of the day</Text>
                </Flex>
                <Text fontSize="xs">{selectedPhrase}</Text>
            </CardBody>
        </Card>
    );
}

export default PhraseOfDay;


