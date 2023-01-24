import styled from 'styled-components';
import { breakpoint, getProp } from '@carpenjk/prop-x/css';

export const StyledLinkIcon = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 8px 0 0;
  width: ${getProp('width')};
  height: ${getProp('height')};

  ${breakpoint('1')`
    width: ${getProp('width')};
    height: ${getProp('height')};
  `}
`;

StyledLinkIcon.defaultProps = {
  width: ['20px', '20px', '24px'],
  height: ['20px', '20px', '24px'],
};
