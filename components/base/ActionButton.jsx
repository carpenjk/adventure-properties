import Link from 'next/link';
import styled from 'styled-components';
import {
  getBackgroundColor,
  getColor,
  getWidth,
  breakpoint,
} from 'themeweaver';
import { getProp } from 'dataweaver';

const StyledButton = styled.button`
  display: flex;
  justify-items: center;
  align-items: center;
  justify-content: center;

  border: 2px solid #cdf7f6;
  border-radius: 10px;
  width: ${(props) => getWidth(props.semKey, 'auto')};
  color: ${(props) => getColor(props.semKey, 'white')};
  background-color: ${(props) => getBackgroundColor(props.semKey, '#E5707A')};

  ${breakpoint(1)`
    width: ${(props) => getWidth(props.semKey, 'auto')};
    color: ${(props) => getColor(props.semKey, 'white')};
    background-color: ${(props) =>
      getBackgroundColor(props.semKey, '#E5707A')(props, 1)};
  `}
`;

const ActionButton = ({ variant, children }) => (
  <StyledButton semKey={`button.${variant}`}>{children}</StyledButton>
);

export default ActionButton;
