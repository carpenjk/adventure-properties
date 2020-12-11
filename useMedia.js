import { createMedia } from '@artsy/fresnel';
import { theme } from './theme';

const useMedia = (props) => {
  const { theme } = props;
  // 1. create media objects with shared breakpoints file
  // 2. call useMedia(media)
  // 3. translate

  // <Media at="1" >
  //    <ConditionalElement />
  // </Media>

  const breakpoints = {
    1: 880,
    2: 1050,
    3: 1200,
    4: 1400,
  };

  const { MediaContextProvider, Media } = createMedia({
    breakpoints,
  });
};
