import styled from 'styled-components';

const StyledCounter = styled.div`
  position: absolute;
  right: 16px;
  bottom: 16px;
  color: white;
  padding: 8px;
  border-radius: 3px;
  background-color: rgba(74, 74, 74, 0.5);
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  font-weight: bold;
  z-index: 1000;
`;

const LightboxCounter = ({ currIndex, imgCount }) => (
  <StyledCounter>
    {currIndex + 1}/{imgCount}
  </StyledCounter>
);

export default LightboxCounter;
