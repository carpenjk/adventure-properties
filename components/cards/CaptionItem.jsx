import styled from 'styled-components';

const StyledCaptionItem = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding-left: 0.4rem;
  padding-right: 0.4rem;
  font-family: ${({ theme }) => theme.fonts.poppins};
  font-style: normal;
  font-weight: normal;
  font-size: ${({ theme }) => theme.fontSizes[1]}px;
  color: ${({ theme }) => theme.colors.lightText};
`;

const CaptionItem = ({ caption }) => (
  <StyledCaptionItem>{caption}</StyledCaptionItem>
);

export default CaptionItem;
