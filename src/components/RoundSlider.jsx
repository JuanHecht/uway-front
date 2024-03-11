import {
    Image,
    Box,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    SliderMark,
    Button
  } from '@chakra-ui/react';
  
  import { useState , useContext} from 'react';
  import { Link } from 'react-router-dom';
  import { AuthContext } from "../context/auth.context";
  
  function RoundSlider() {
    const [sliderValue, setSliderValue] = useState(50);
    const { getMoodAndImageUrl} = useContext(AuthContext);

  
    const labelStyles = {
      mt: '2',
      ml: '-2.5',
      fontSize: 'sm',
    };
  
    /* const getMoodAndImageUrl = (value) => {
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
    }; */
  
    const { mood, imageUrl } = getMoodAndImageUrl(sliderValue);
  
    return (
      <Box>
        <Box>
          <Image
            borderRadius='full'
            boxSize='150px'
            src={imageUrl}
            alt=''
          />
        </Box>
  
        <Box p={4} pt={6}>
          <Slider aria-label='slider-ex-6' onChange={(val) => setSliderValue(val)}>
            <SliderMark value={0} {...labelStyles}>
              very sad
            </SliderMark>
            <SliderMark value={25} {...labelStyles}>
              sad
            </SliderMark>
            <SliderMark value={50} {...labelStyles}>
              normal
            </SliderMark>
            <SliderMark value={75} {...labelStyles}>
              happy
            </SliderMark>
            <SliderMark value={100} {...labelStyles}>
              very happy
            </SliderMark>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </Box>
        <Link to={'/dailylog/create'}>
            <Button mt="20px" colorScheme='teal'>Submit</Button>
        </Link>
      </Box>
    );
  }
  
  export default RoundSlider;
  