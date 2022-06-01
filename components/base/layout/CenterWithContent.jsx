import styled from 'styled-components';

const StyledCenter = styled.div`
  display: block;
  margin: auto;
  width: fit-content;
`;
const CenterWithContent = ({ children }) => (
  <StyledCenter>{children}</StyledCenter>
);

export default CenterWithContent;
