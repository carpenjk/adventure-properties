import styled from 'styled-components';
import { breakpoint, condition, getProp } from '@carpenjk/prop-x/css';

export const StyledLinkIcon = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: ${getProp('margin')};
  width: ${getProp('width')};
  height: ${getProp('height')};

  ${condition('hide')`
    display: none;
  `}

  ${breakpoint('1')`
    width: ${getProp('width')};
    height: ${getProp('height')};
    margin: ${getProp('margin')};
    ${condition('hide')`
      display: none;
    `}
  `}
`;

StyledLinkIcon.defaultProps = {
  width: ['20px', '20px', '24px'],
  height: ['20px', '20px', '24px'],
  margin: ['0 0 12px 0', '0 12px 0 0'],
};
