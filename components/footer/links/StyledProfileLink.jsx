import styled from 'styled-components';
import { breakpoint } from '@carpenjk/prop-x/css';

export default styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 4px;
  border: 2px solid transparent;
  cursor: pointer;
  text-decoration-color: #55b467;

  &::after {
    content: ' ';
    position: absolute;
    margin: auto;
    transform: translateX(-50%);
    left: 50%;
    bottom: -4px;
    height: 2px;
    width: 0;
    background: transparent;
    transition: width 450ms ease-in-out, background-color 450ms ease-in-out;
  }

  &:hover::after {
    content: ' ';
    width: calc(100% - 4px);
    background: #55b467;
    transition: width 450ms ease-in-out, background-color 450ms ease-in-out;
  }

  ${breakpoint('1')`
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    &:hover::after {
      width: calc(100% - 4px);
      background: #55b467;
      transition: width 450ms ease-in-out, background-color 450ms ease-in-out;
    }
  `}
`;
