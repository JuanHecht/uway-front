import BottomNavBar from "../components/BottomNavbar";

import RoundSlider from "../components/RoundSlider";
import CalendarPreview from "../components/CalendarPreview";
import PhraseOfDay from "../components/PhraseOfDay";

import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import {
    Image,
    Box,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    SliderMark,
    Button,
    Text,
    Flex,
    Heading, Card, CardHeader
} from '@chakra-ui/react';

import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from "../context/auth.context";
import CircularSlider from '@fseehawer/react-circular-slider';



function Landing() {
    const { user, dailyLogs } = useContext(AuthContext);
    const [sliderValue, setSliderValue] = useState(50);

    const getMoodAndImageUrl = (value) => {
        let mood, imageUrl;

        if (value < 15) {

            mood = "Very sad";
            imageUrl = "/images/verysad_360.png";
        } else if (value >= 15 && value <= 35) {

            mood = "Sad";
            imageUrl = "/images/sad_360.png";
        } else if (value > 35 && value <= 65) {

            mood = "Normal";
            imageUrl = "/images/normal_360.png";
        } else if (value > 65 && value <= 90) {

            mood = "Happy";
            imageUrl = "/images/happy_360.png";
        } else {

            mood = "Very happy";
            imageUrl = "/images/veryhappy_360.png";
        }
        return { mood, imageUrl };
    };

    return (
        <Box>
            <PhraseOfDay />
            <Card m="5px">
                <CardHeader display="flex" flexDir="column">
                    <Box>
                        <Heading size="lg" mb="10px" >Track your mental health</Heading>

                    </Box>
                    <Flex>
                        <Text fontSize="xs">Submit progress daily, we'll help you find inner peace</Text>
                        <Link to="/signup"><Button color="white" bg="black">Create account</Button></Link>
                    </Flex>

                </CardHeader>
            </Card>
            {/* <Text mb="25px" bg="#F7FAFC" textAlign="center" fontSize="20px">
                Get control of your life using UWAY, by updating your progress daily we'll help you find your purpose<Link to="/signup"><Button bg="grey">Create account</Button></Link> 
            </Text> */}
            <Flex direction="column" textAlign="center">
                <Text mb="10px">This week's preview</Text>
                <FullCalendar
                    height="90px"
                    plugins={[dayGridPlugin]}
                    initialView="dayGridWeek"
                    headerToolbar={false}
                    dayHeaderContent={({ date }) => (
                        <span className="text-s" style={{ fontSize: '20px' }}>{date.toLocaleDateString('en-US', { weekday: 'short' })}</span>
                    )}
                    eventContent={({ event }) => (
                        <img src={mapMoodToNameAndImage(event.extendedProps.mood)} alt="" style={{ width: '100%', height: '100%' }} />
                    )}
                />
                <Box>
                    <Box display="flex" justifyContent="center" alignText="center">
                        <Text>How are you feeling today?</Text>
                    </Box>
                    <Box display="flex" justifyContent="center" flexDirection="column" alignItems="center" >
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
                                <Image
                                    src={getMoodAndImageUrl(sliderValue).imageUrl} // Call getMoodAndImageUrl to get the imageUrl
                                    alt=""
                                    position="absolute"
                                    top="35%"
                                    left="50%"
                                    transform="translate(-50%, -50%)"
                                    width="90%"
                                    height="65%"
                                    transition="transform 0.3s ease"
                                    cursor="pointer"
                                />
                            </Box>


                            <Box mb="50px" mt="20px">
                                <Link to="/login" style={{ textDecoration: 'none' }}>
                                    <Button bg="black" color="white" >
                                        Submit
                                    </Button>
                                </Link>
                            </Box>
                        </Box>
                    </Box>
                </Box>

            </Flex>
        </Box>

    )
}

export default Landing;