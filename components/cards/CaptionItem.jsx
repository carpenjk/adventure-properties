import styled from 'styled-components';

const StyledCaptionItem = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  /* text/small2 */
  padding-left: 0.4rem;
  padding-right: 0.4rem;
  font-family: Poppins;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  color: var(--lightText);
`;

const CaptionItem = ({ caption }) => (
  <StyledCaptionItem>{caption}</StyledCaptionItem>
);

export default CaptionItem;
