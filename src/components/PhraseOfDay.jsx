import React, { useEffect, useState } from "react";
import phraseData from "../data/phraseOfDay.json";
import { CardBody, Card, Text } from "@chakra-ui/react";

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
        <Card p="0"  bg="#F7FAFC" textAlign="center"  m="10px" >
            <CardBody bg="">
                <Text fontSize="sm">{selectedPhrase}</Text>
            </CardBody>
        </Card>
    );
}

export default PhraseOfDay;


