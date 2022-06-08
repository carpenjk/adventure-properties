import styled from 'styled-components';

const StyledBackground = styled.div`
  content: '';
  background: #ffffff;
  opacity: 0.85;
  border-radius: 3px;

  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: -1;
`;

const BannerBackground = () => <StyledBackground />;

export default BannerBackground;
