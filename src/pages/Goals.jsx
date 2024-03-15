import MainFocus from "../components/MainFocus";
import Activites from "../components/Activites";
import GoalsComponent from "../components/GoalsComponent";
import { Box, Heading, Text, Card, CardHeader, CardBody, Stack, StackDivider } from "@chakra-ui/react";



function Goals() {
    return (
        <Box m="6">
            <Card mb="6" >
                <CardHeader>
                    <Heading size='md' >How you live your days is how you live your life</Heading>
                </CardHeader>
                <Stack divider={<StackDivider />} spacing='1'> </Stack>
                <CardBody>
                    
                        <Box>
                            <Heading size='xs'>
                                Every day counts
                            </Heading>
                            <Heading size='xs'>
                                Your purpose is within yourself, but we'll help you find it
                            </Heading>

                        </Box>

                   
                </CardBody>
            </Card>

            <Box mb={6}>
                <MainFocus />
                <Card mb="6" >
                    <CardHeader>
                        <Heading size='md' > Your daily activities shape your day</Heading>
                    </CardHeader>

                    <CardBody>
                        <Stack divider={<StackDivider />} spacing='2'>
                            <Box>
                                <Heading size='xs'>
                                    To help you track them, add your recurring activities
                                </Heading>

                            </Box>

                        </Stack>
                    </CardBody>
                </Card>

                <Activites />
            </Box>

            <Box>
                <Card mb="6" >
                    <CardHeader>
                        <Heading size='md' > Now let's set your goals</Heading>
                    </CardHeader>

                    <CardBody>
                        <Stack divider={<StackDivider />} spacing='2'>
                            <Box>
                                <Heading size='xs'>
                                    Some examples of goals can be to achieve something like read a book, or to quit a habit like quit smoking
                                </Heading>

                            </Box>

                        </Stack>
                    </CardBody>
                </Card>

                <GoalsComponent />
            </Box>
        </Box>
    )
}
export default Goals;