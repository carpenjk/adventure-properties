import { getProp, condition } from 'dataweaver';
import styled from 'styled-components';

const StyledFixed = styled.div`
  position: fixed;
  height: ${getProp('height')};
  width: ${getProp('width')};
  min-width: ${getProp('minWidth')};
  z-index: 10001;
  ${condition('top')`
    top: 0;
  `}
  ${condition('right')`
    right: 0;
  `}
  ${condition('bottom')`
    bottom: 0;
  `}
  ${condition('left')`
    left: 0;
  `}
`;

StyledFixed.defaultProps = {
  height: 'auto',
  width: 'auto',
  minWidth: '320px',
};

const Fixed = ({ children, ...passProps }) => (
  <StyledFixed {...passProps}>{children}</StyledFixed>
);

export default Fixed;
