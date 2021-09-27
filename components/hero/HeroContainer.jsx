import styled from 'styled-components';
import { getHeight, getWidth, getBackgroundColor } from 'themeweaver';
import { getProp } from 'dataweaver';

import HeroBanner from './HeroBanner';

const StyledHeroContainer = styled.div`
  overflow: hidden;
  position: ${getProp('position')};
  top: ${getProp('offsetTop', '0')};
  width: ${getWidth('hero', '100%')};
  height: ${getHeight('hero', '100%')};
  background-color: ${getBackgroundColor('hero', 'unset')};
`;

StyledHeroContainer.defaultProps = {
  position: 'relative',
  offsetTop: '0',
  backgroundImage: 'none',
};

const StyledHero = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: calc(100vw + 17px);
  background-image: url(${getProp('backgroundImage')});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

StyledHero.defaultProps = {
  backgroundImage: 'none',
};

const HeroContainer = (props) => {
  const { backgroundImage, position, offsetTop } = props;
  return (
    <StyledHeroContainer {...props}>
      <StyledHero backgroundImage={backgroundImage} />
      <HeroBanner />
    </StyledHeroContainer>
  );
};

export default HeroContainer;