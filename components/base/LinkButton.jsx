import styled from 'styled-components';
import { getProp } from 'dataweaver';

const StyledButton = styled.button`
  display: flex;
  background: none;
  padding: 0;
  margin: 0;
  color: ${getProp('color')};
`;

const LinkButton = ({ color, children, onClick, className }) => (
  <StyledButton
    className={className}
    color={color || '#0000EE'}
    onClick={onClick}
  >
    {children}
  </StyledButton>
);

export default LinkButton;
