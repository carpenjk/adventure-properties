import styled from 'styled-components';
import { breakpoint } from '@carpenjk/prop-x/css';

export default styled.div`
  font-family: 'Comfortaa';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  color: #55b467;
  ${breakpoint('1')`
    font-size: 16px;
  `}
`;
