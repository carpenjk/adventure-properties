import styled from 'styled-components';
import { breakpoint, getProp } from '@carpenjk/prop-x/css';

const Container = styled.div`
  height: 50px;
  width: ${getProp('width')};
  background: blue;

  ${breakpoint(['1', '2'])`
    width: ${getProp('width')};
  `}
`;
const TestComponent = ({ width }) => <Container width={width} />;

export default TestComponent;
