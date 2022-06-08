import { condition } from 'dataweaver';
import styled from 'styled-components';

const StyledOuter = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  background: transparent;

  ${condition('horizontalCenter')`
    justify-content: center;
  `}
  ${condition('verticalCenter')`
    justify-content: center;
  `}
`;
const OuterContainer = ({ children, ...props }) => (
  <StyledOuter {...props}>{children}</StyledOuter>
);

export default OuterContainer;
