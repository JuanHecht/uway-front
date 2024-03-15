import {
  Image,
  Box,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Button,
  Text
} from '@chakra-ui/react';

import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from "../context/auth.context";
import CircularSlider from '@fseehawer/react-circular-slider';

function RoundSlider() {
  const [sliderValue, setSliderValue] = useState(50);
  const { getMoodAndImageUrl } = useContext(AuthContext);


  const labelStyles = {
    mt: '2',
    ml: '-2.5',
    fontSize: 'sm',
  };

  const { mood, imageUrl } = getMoodAndImageUrl(sliderValue);



  return (
    <Box mt="20px">
      <Box  display="flex" justifyContent="center" alignText="center">
        <Text  fontWeight="bold">How are you feeling today?</Text>
      </Box>
      <Box display="flex" justifyContent="center" flexDirection="column" alignItems="center" >
        <Box mt="20px" position="relative">
          
          <Box >
            <CircularSlider
              value={sliderValue}
              onChange={(value) => setSliderValue(value)}
              min={0}
              max={100}
              knobColor="black"
              progressColorFrom="red"
              progressColorTo="green"
              trackColor="#edede9"
              dataIndex={sliderValue}
              hideLabelValue
              label="Mood"
              labelColor="#4a5568"
              knobSize={35}
              progressSize={30}
              trackSize={8}
            />
          </Box>
          <Image
            src={imageUrl}
            alt=""
            position="absolute"
            top="49%"
            left="50%"
            transform="translate(-50%, -50%)"
            width="90%"
            height="90%"
            transition="transform 0.3s ease"
            cursor="pointer"
          />
        </Box>

        <Box mb="50px" mt="20px">
          <Link to="/dailylog/create" style={{ textDecoration: 'none' }}>
            <Button bg="black" color="white" >
              Submit
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}

export default RoundSlider;



// LOADING IMAGE CORRECTLY; BUT NOT WHEN CHANGING IMAGES

/* import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from "../context/auth.context";
import CircularSlider from '@fseehawer/react-circular-slider';
import { Image, Box, Button, Text, Spinner } from '@chakra-ui/react';

function RoundSlider() {
  const [sliderValue, setSliderValue] = useState(50);
  const [loading, setLoading] = useState(false);
  const [mood, setMood] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const { getMoodAndImageUrl } = useContext(AuthContext);

  useEffect(() => {
    setLoading(true); // Set loading to true when fetching starts
    const timer = setTimeout(() => {
      const { mood, imageUrl } = getMoodAndImageUrl(sliderValue);
      setMood(mood);
      setImageUrl(imageUrl);
      setLoading(false); // Set loading to false after fetching completes
    }, 200); // One second delay
    return () => clearTimeout(timer);
  }, [sliderValue, getMoodAndImageUrl]);

  return (
    <Box>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Text>How are you feeling today?</Text>
      </Box>
      <Box display="flex" justifyContent="center" flexDirection="column" alignItems="center">
        <Box mt="20px" position="relative">
          <Box>
            <CircularSlider
              value={sliderValue}
              onChange={(value) => setSliderValue(value)}
              min={0}
              max={100}
              knobColor="black"
              progressColorFrom="red"
              progressColorTo="green"
              trackColor="#edede9"
              dataIndex={sliderValue}
              hideLabelValue
              label="Mood"
              labelColor="#4a5568"
              knobSize={35}
              progressSize={30}
              trackSize={8}
            />
          </Box>
          {loading ? ( // Display loading spinner if loading is true
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
            />
          ) : (
            <Image
              src={imageUrl}
              alt=""
              position="absolute"
              top="49%"
              left="50%"
              transform="translate(-50%, -50%)"
              width="90%"
              height="90%"
              cursor="pointer"
            />
          )}
        </Box>
        <Box mb="50px" mt="20px">
          <Link to="/dailylog/create" style={{ textDecoration: 'none' }}>
            <Button bg="black" color="white">Submit</Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}

export default RoundSlider;
 */