import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Button,
  Card,
  CardHeader,
  CardBody,
  Stack,
  Heading,
  Text,
  Avatar,
  StackDivider
} from "@chakra-ui/react";

function DailyLogCard({ dailyLog }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDateClick = () => {
    onOpen();
  };

  const mapMoodToNameAndImage = (moodNumber) => {
    switch (moodNumber) {
      case 1:
        return "/images/verysad_360.png";
      case 2:
        return "/images/sad_360.png";
      case 3:
        return "/images/normal_360.png";
      case 4:
        return "/images/happy_360.png";
      case 5:
        return "/images/veryhappy_360.png";
      default:
        return "/images/veryhappy_360.png";
    }
  };

  return (
    <Box m="4">
      <Card mb="70px" bg="#F7FAFC">
        <CardHeader mb="0" pb="0" pt="8px">
          <Box display="flex" justifyContent="space-between">
            <Box>
          <Avatar name="mood" src={mapMoodToNameAndImage(dailyLog.mood)} />
          </Box>
          <Box mt="10px" fontWeight="bold">{dailyLog.createdAt.slice(0,10)}</Box>
          </Box>
        </CardHeader>

        <CardBody pt="8px">
          <Stack divider={<StackDivider />} spacing="3">
            <Box display="flex" justifyContent="space-between">
              <Text fontWeight="bold" textTransform="uppercase">
                Energy Level
              </Text>
              <Text fontWeight="bold">
                {dailyLog.energyLevel}
              </Text>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Text fontWeight="bold" textTransform="uppercase">
                Main Focus
              </Text>
              <Text fontWeight="bold" >
                {dailyLog.mainFocus}
              </Text>
            </Box>
            <Button color="white" size="sm" mb="5px" bg="teal" onClick={handleDateClick}>
              View Details
            </Button>
          </Stack>
        </CardBody>
      </Card>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader></DrawerHeader>
          <DrawerBody>
            <Card mb="70px">
              <CardHeader>
                <Avatar
                  name="mood"
                  src={mapMoodToNameAndImage(dailyLog.mood)}
                />
              </CardHeader>

              <CardBody>
                <Stack divider={<StackDivider />} spacing="4">
                  <Box>
                    <Heading size="xs" textTransform="uppercase">
                      Energy Level
                    </Heading>
                    <Text pt="2" fontSize="sm">
                      {dailyLog.energyLevel}
                    </Text>
                  </Box>
                  {dailyLog.activities.map((activity, index) => (
                    <Box key={index}>
                      <Heading size="xs" textTransform="uppercase">
                        Activities
                      </Heading>
                      <Text pt="2" fontSize="sm">
                        {activity}
                      </Text>
                    </Box>
                  ))}
                  {dailyLog.goals.map((goal, index) => (
                    <Box key={index}>
                      <Heading size="xs" textTransform="uppercase">
                        Goals
                      </Heading>
                      <Text pt="2" fontSize="sm">
                        {goal}
                      </Text>
                    </Box>
                  ))}
                  <Box>
                    <Heading size="xs" textTransform="uppercase">
                      Sleep Time
                    </Heading>
                    <Text pt="2" fontSize="sm">
                      {dailyLog.bedTime.sleepTime}
                    </Text>
                  </Box>
                  <Box>
                    <Heading size="xs" textTransform="uppercase">
                      Wake up Time
                    </Heading>
                    <Text pt="2" fontSize="sm">
                      {dailyLog.bedTime.wakeTime}
                    </Text>
                  </Box>
                  <Box>
                    <Heading size="xs" textTransform="uppercase">
                      Note of the day
                    </Heading>
                    <Text pt="2" fontSize="sm">
                      {dailyLog.notes}
                    </Text>
                  </Box>
                  <Link to={`/dailylogedit/${dailyLog._id}`}>
                    <Button mt="4" colorScheme="teal">
                      Edit Log
                    </Button>
                  </Link>
                </Stack>
              </CardBody>
            </Card>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}

export default DailyLogCard;
