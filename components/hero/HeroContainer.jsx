import styled from 'styled-components';
import { getHeight, getWidth } from 'themeweaver';
import { getProp } from 'dataweaver';
import HeroBanner from './heroBanner/HeroBanner';

const StyledHeroContainer = styled.div`
  position: ${getProp('position')};
  left: 0;
  right: 0;
  overflow-y: hidden;
  overflow-x: hidden;
  top: ${getProp('offsetTop', '0')};
  width: ${getWidth({}, '100%')};
  height: ${getHeight({}, '100%')};
`;

StyledHeroContainer.defaultProps = {
  position: 'relative',
  offsetTop: '0',
  backgroundImage: 'none',
};

const DEFAULT_TW = { semKey: 'hero' };

const HeroContainer = (props) => {
  const { image, tw, bannerLayout, bannerPos, ...remProps } = props;
  const mergedTw = { ...DEFAULT_TW, ...tw };
  return (
    <StyledHeroContainer {...remProps} tw={mergedTw}>
      {image}
      <HeroBanner
        tw={{ ...mergedTw, semKey: 'heroBanner' }}
        bannerPos={bannerPos}
      >
        {bannerLayout}
      </HeroBanner>
    </StyledHeroContainer>
  );
};

export default HeroContainer;
