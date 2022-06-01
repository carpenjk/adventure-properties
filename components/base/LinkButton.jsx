import styled from 'styled-components';
import { getProp } from 'dataweaver';

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  background: none;
  padding: 0;
  margin: 0;
  color: ${getProp('color')};
`;

const LinkButton = ({ children, color, ...remProps }) => (
  <StyledButton color={color || '#0000EE'} {...remProps}>
    {children}
  </StyledButton>
);

export default LinkButton;
