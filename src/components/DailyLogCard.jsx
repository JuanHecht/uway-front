import React from "react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardBody, Heading,Stack, Box, Text, StackDivider,Avatar } from '@chakra-ui/react'

function DailyLogCard({ dailyLog }) {
 {/* return (
    <div key={dailyLog._id}>
      <h3>Mood: {dailyLog.mood}</h3>
      <p>Notes: {dailyLog.notes}</p>
      <Link to={`/dailylogedit/${dailyLog._id}`}>
        <button>Edit log</button>
      </Link>
    </div>
 );*/}
 const mapMoodToNameAndImage = (moodNumber) => {
  switch (moodNumber) {
      case 1:
          return '/images/verysad_360.png';
      case 2:
          return '/images/sad_360.png';
      case 3:
          return '/images/normal_360.png';
      case 4:
          return '/images/happy_360.png';
      case 5:
          return '/images/veryhappy_360.png';
      default:
          return '/images/veryhappy_360.png';
  }
};
 return (
  <Card>
  <CardHeader>
  <Avatar name='mood' src={mapMoodToNameAndImage(dailyLog.mood)} />
  </CardHeader>

  <CardBody>
    <Stack divider={<StackDivider />} spacing='4'>
      <Box>
        <Heading size='xs' textTransform='uppercase'>
         Energy Level
        </Heading>
        <Text pt='2' fontSize='sm'>
          {dailyLog.energyLevel}
        </Text>
      </Box>
      <Box>
        <Heading size='xs' textTransform='uppercase'>
          Main Focus
        </Heading>
        <Text pt='2' fontSize='sm'>
          {dailyLog.mainFocus}
        </Text>
      </Box>
      <Box>
        <Heading size='xs' textTransform='uppercase'>
          sleep time
        </Heading>
        <Text pt='2' fontSize='sm'>
          {dailyLog.bedTime.sleepTime}
        </Text>
      </Box>
    </Stack>
  </CardBody>
</Card>
 )
}

export default DailyLogCard;