import styled from 'styled-components';

const StyledCategory = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-left: ${({ theme }) => theme.space[2]}px;
  padding-right: ${({ theme }) => theme.space[2]}px;
`;
const StyledTitle = styled.h2`
  font-weight: bold;
  color: black;
`;
const PropertyDetailCategory = ({ children, title }) => (
  <StyledCategory>
    <StyledTitle>{title}</StyledTitle>
    {children}
  </StyledCategory>
);

export default PropertyDetailCategory;
