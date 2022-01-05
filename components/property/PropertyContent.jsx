import styled from 'styled-components';

const StyledContent = styled.div`
  display: flex;
  align-items: flex-start;
  padding: ${({ theme }) => theme.space[3]}px;
  width: 100%;
  max-width: 1200px;
`;

const PropertyContent = ({ children }) => (
  <StyledContent>{children}</StyledContent>
);

export default PropertyContent;
