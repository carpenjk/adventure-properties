import styled from 'styled-components';

const StyledLabel = styled.label`
  font-family: Open Sans;
  font-size: 11px;
  font-weight: bold;
  letter-spacing: 0.025em;
  line-height: 225%;
  color: #7789c8;
`;

const InputLabel = ({ htmlFor, children }) => (
  <StyledLabel htmlFor={htmlFor}>{children}</StyledLabel>
);

export default InputLabel;
