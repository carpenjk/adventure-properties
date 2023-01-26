import styled from 'styled-components';
import { breakpoint, condition } from '@carpenjk/prop-x/css';

export default styled.div`
  display: block;
  font-family: 'Comfortaa';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  color: #55b467;
  ${condition('hide')`
    display: none;
  `}
  ${breakpoint('1')`
    display: block;
    font-size: 16px;
    ${condition('hide')`
      display: none;
    `}
  `}
`;
