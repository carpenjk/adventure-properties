import styled from 'styled-components';
import { breakpoint } from '@carpenjk/prop-x/css';

export default styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  max-width: 325px;
  padding: 18px 24px;

  > li {
    margin-right: 16px;
  }
  ${breakpoint('1')`
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: flex-start;
    padding: 18px 32px;
    > li {
      margin-bottom: 32px;
    }
    > li:last-child {
      margin-bottom: 0;
    }
  `}
`;
