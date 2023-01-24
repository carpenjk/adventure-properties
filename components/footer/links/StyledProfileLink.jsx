import styled from 'styled-components';
import { breakpoint } from '@carpenjk/prop-x/css';

export default styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;

  > span:last-child {
    margin-left: 12px;
  }
  &:hover > span:last-child > div {
    color: ${(props) => props.theme.colors.grass11};
    transition: color 450ms ease-in-out, text-decoration 300ms ease-in-out;
  }

  &:hover {
    transition: opacity 400ms ease-in-out;
  }
  ${breakpoint('sm')`
    > span:last-child {
      margin-left: 24px;
    }
  `}
`;
