import styled from 'styled-components';
import { breakpoint } from 'themeweaver';

const StyledHeader = styled.div`
  position: absolute;
  top: 32px;
  left: 0;
  right: 0;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  font-weight: bold;

  ${breakpoint(1)`
    top: calc(112px - 64px);
  `}

  > span {
    position: relative;
    margin: 0 auto;
  }
`;

const StyledCloseBtn = styled.button`
  position: absolute;
  left: 0;
  padding: 16px;
  background: transparent;
  color: inherit;
  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;
  border-radius: 3px;

  &:hover {
    background: rgb(74, 74, 74);
  }
`;

const LightboxHeader = ({ currIndex, imgCount, onClose }) => (
  <StyledHeader>
    <StyledCloseBtn onClick={onClose}>X Close</StyledCloseBtn>
    <span>{`${currIndex + 1}/${imgCount}`}</span>
  </StyledHeader>
);

export default LightboxHeader;
