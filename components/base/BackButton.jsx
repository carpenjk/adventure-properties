import styled from 'styled-components';
import Link from 'next/link';
import OverlayNavButton from './OverlayNavButton';

const StyledContainer = styled.div`
  position: fixed;
  top: 95px;
  left: 10px;
  z-index: 999;

  img {
    padding-right: 5px;
  }
`;

const BackButton = ({ path }) => (
  <StyledContainer>
    <OverlayNavButton path={path}>
      <img src="../static/assets/misc/back arrow.svg" alt="back arrow" />
      back
    </OverlayNavButton>
  </StyledContainer>
);

export default BackButton;
