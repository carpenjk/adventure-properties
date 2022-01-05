import styled from 'styled-components';

const StyledDescription = styled.p`
  margin: 0;
  display: flex;
  align-items: center;
  padding-left: ${({ theme }) => theme.space[2]}px;
  padding-right: ${({ theme }) => theme.space[2]}px;

  font-family: ${({ theme }) => theme.fonts.openSans};
  font-size: ${({ theme }) => theme.fontSizes[2]}px;
  line-height: 150%;
  letter-spacing: 0.025em;
  color: ${({ theme }) => theme.colors.mainText};
`;

const PropertyDescription = ({ children }) => (
  <StyledDescription>{children}</StyledDescription>
);

export default PropertyDescription;
