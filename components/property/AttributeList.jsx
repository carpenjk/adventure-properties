import styled from 'styled-components';

const StyledList = styled.ul`
  margin: 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto;
  grid-gap: ${({ theme }) => theme.space[4]}px;
  justify-items: flex-start;
  align-items: stretch;

  > li {
    display: flex;
    align-items: center;

    font-family: Open Sans;
    font-size: ${({ theme }) => theme.fontSizes[2]}px;
    line-height: 150%;
    letter-spacing: 0.025em;
    color: ${({ theme }) => theme.colors.lightText};
  }
`;
const AttributeList = ({ children }) => <StyledList>{children}</StyledList>;

export default AttributeList;
