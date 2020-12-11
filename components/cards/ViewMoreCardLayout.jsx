import styled from 'styled-components';
import SliderMoreBadge from '../slider/SliderMoreBadge';

const StyledLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
const ViewMoreCardLayout = () => (
  <StyledLayout>
    <SliderMoreBadge text="More Skiing" />
  </StyledLayout>
);

export default ViewMoreCardLayout;
