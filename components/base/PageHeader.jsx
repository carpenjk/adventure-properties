import styled from 'styled-components';
import { breakpoint } from 'themeweaver';

const StyledHeader = styled.h1`
  display: block;
  width: 100%;
  margin: 0;
  padding-top: ${({ theme }) => theme.space[3]}px;
  padding-bottom: ${({ theme }) => theme.space[3]}px;
  color: ${({ theme }) => theme.colors.mainText};
  font-family: ${({ theme }) => theme.fonts.poppins};
  font-weight: bold;
  font-size: ${({ theme }) => theme.fontSizes[3]}px;

  ${breakpoint(1)`
    font-size: ${({ theme }) => theme.fontSizes[4]}px;
  `}
`;

const PageHeader = ({ title }) => <StyledHeader>{title}</StyledHeader>;

export default PageHeader;
