import styled from 'styled-components';
import OverlayNavLink from './OverlayNavLink';

const StyledContainer = styled.div`
  position: fixed;
  top: 95px;
  left: 10px;
  z-index: 10001;

  img {
    padding-right: 5px;
  }
`;

const BackButton = ({ path }) => (
  <StyledContainer>
    <OverlayNavLink href={path}>
      <img src="../static/assets/misc/back arrow.svg" alt="back arrow" />
      back
    </OverlayNavLink>
  </StyledContainer>
);

export default BackButton;
