import styled from 'styled-components';
import { breakpoint } from 'themeweaver';
import { condition } from 'dataweaver';

const StyledDescription = styled.div`
  width: 100%;
  height: 15em;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  color: ${({ theme }) => theme.colors.mainText};
  font-family: ${({ theme }) => theme.fonts.openSans};
  font-size: ${({ theme }) => theme.fontSizes[2]}px;
  line-height: 150%;
  letter-spacing: 0.025em;
  padding-top: ${({ theme }) => theme.space[5]}px;
  padding-right: ${({ theme }) => theme.space[5]}px;
  padding-bottom: ${({ theme }) => theme.space[5]}px;
  padding-left: ${({ theme }) => theme.space[5]}px;

  ${condition('hide')`
    display: none;
  `}

  ${breakpoint(1)`
    width: unset;
  `}
`;

const PropertyDescription = ({ description, hide }) => (
  <StyledDescription hide={hide}>{description}</StyledDescription>
);

export default PropertyDescription;
