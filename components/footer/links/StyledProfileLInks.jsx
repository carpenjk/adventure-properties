import styled from 'styled-components';
import { breakpoint } from '@carpenjk/prop-x/css';

export default styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 18px 24px;
  background-color: ${(props) => props.theme.colors.indigo3};
  border-radius: 20px;

  > li {
    margin-bottom: 32px;
  }
  > li:last-child {
    margin-bottom: 0;
  }
  ${breakpoint('sm')`
    padding: 18px 32px;
  `}
  ${breakpoint('md')`
    padding: 18px 40px;
  `}
`;
