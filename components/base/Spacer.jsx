import styled from 'styled-components';
import { getProp, condition } from 'dataweaver';
import { breakpoint } from 'themeweaver';

const StyledSpacer = styled.div`
  display: flex;
  flex: none;
  width: ${getProp('space')};

  ${condition('vertical')`
    flex: none;  
    height: ${getProp('space')};
    width: 100%;
  `}

  ${breakpoint(1)`
    width: ${getProp('space')};
    ${condition('vertical')`
    height: ${getProp('space')};
    `}
  `}
`;
const Spacer = ({ space, vertical }) => (
  <StyledSpacer space={space} vertical={vertical} />
);

export default Spacer;
