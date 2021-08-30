import styled from 'styled-components';
import Link from 'next/link';

const StyledContainer = styled.div`
  z-index: 999999;

  > a {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 10px;

    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 21px;
    letter-spacing: 0.025em;
    /* identical to box height */
    
    display: flex;
    align-items: center;
    text-align: center;
    
    /* text/ light */    
    color: #979797;

    /* grey background */
    background: #F8F8F8;
    
    /* button shadow */
    box-shadow: 0px 1px 2px rgba(116, 108, 108, 0.25);
    border-radius: 5px;
    
`;
const OverlayNavButton = ({ children, path }) => (
  <StyledContainer>
    <Link href={path || ''}>
      <a>{children}</a>
    </Link>
  </StyledContainer>
);

export default OverlayNavButton;
