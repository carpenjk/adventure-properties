import styled from 'styled-components';
import { getProp, condition } from 'dataweaver';
import { NonceProvider } from 'react-select';

const StyledSpacer = styled.div`
  display: flex;
  flex: none;
  width: ${getProp('space')};

  ${condition('vertical')`
  flex: none;  
  height: ${getProp('space')};
  width: 100%;
`}
`;
const Spacer = ({ space, vertical }) => (
  <StyledSpacer space={space} vertical={vertical} />
);

export default Spacer;
