import styled from 'styled-components';
import MoreButton from '../MoreButton';

const StyledSliderFooter = styled.div`
  align-self: flex-end;
`;

const SliderFooter = ({ topic, moreRef }) => (
  <StyledSliderFooter>
    <MoreButton
      text={`More Properties based on ${topic} >`}
      isExpanded={false}
      innerRef={moreRef}
    />
  </StyledSliderFooter>
);

export default SliderFooter;
