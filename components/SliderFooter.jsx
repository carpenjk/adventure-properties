import styled from 'styled-components';
import MoreButton from './MoreButton';
const StyledSliderFooter = styled.div`
  align-self: flex-start;
`;

const SliderFooter = ({ topic }) => {
  return (
    <StyledSliderFooter>
      <MoreButton text={`More ${topic}`} expanded={false} />
    </StyledSliderFooter>
  );
};

export default SliderFooter;
