import styled from 'styled-components';
import { breakpoint } from 'themeweaver';

const StyledInputGroup = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.space[3]}px;

  box-shadow: 0px 0px 8px rgba(192, 192, 192, 0.52);
  border-radius: 5px;
`;

const StyledInputGroupHeading = styled.div`
  display: flex;
  justify-content: flex-start;
  margin: 0;
  font-family: Open Sans;
  font-size: ${({ theme }) => theme.fontSizes[2]}px;
  font-weight: bold;
  letter-spacing: 0.025em;
  color: #000000;
  padding-bottom: 8px;

  ${breakpoint(1)`
    font-size: 16px;
  `}
`;

const InputGroup = ({ children, heading }) => (
  <StyledInputGroup>
    <StyledInputGroupHeading>{heading}</StyledInputGroupHeading>
    {children}
  </StyledInputGroup>
);

export default InputGroup;
