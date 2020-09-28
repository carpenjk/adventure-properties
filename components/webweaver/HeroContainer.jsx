import styled from 'styled-components';
import { getHeight, getWidth, getBackgroundColor } from 'themeweaver';
import { getProp, getComponentData, getSubComponentProps } from 'dataweaver';
import SubComponents from './SubComponents';

//! refactor to pass in header height offset ***********************************************
const StyledHeroContainer = styled.div`
  position: ${getProp('position')};
  top: ${getProp('offsetTop')};
  width: ${getWidth('hero', '100%')};
  height: ${getHeight('hero', '100%')};
  background-image: url(${getProp('backgroundImage')});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-color: ${getBackgroundColor('hero', 'unset')};
`;

StyledHeroContainer.defaultProps = {
  position: 'relative',
  offsetTop: '80px',
  backgroundImage: 'none',
};

const HeroContainer = ({ data, semKey, ...directProps }) => {
  const { props } = getComponentData(semKey, data)[semKey];
  const mobileBreakpoint = 'min-width: 800px';
  const popupMaxScreenWidth = '800';
  return (
    <StyledHeroContainer {...props}>
      <SubComponents
        {...getSubComponentProps(semKey, data)}
        mobileBreakpoint={mobileBreakpoint}
        popupMaxScreenWidth={popupMaxScreenWidth}
      />
    </StyledHeroContainer>
  );
};

export default HeroContainer;
