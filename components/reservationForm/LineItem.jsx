import styled from 'styled-components';
import { breakpoint } from '@carpenjk/prop-x/css';

const StyledLineItem = styled.div`
  display:flex;
  justify-content: space-between;
  width: 100%:

  /* text/body1 */

  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 150%;

  display: flex;
  align-items: center;
  letter-spacing: 0.025em;
  color: #444649;

  ${breakpoint(1)`
    font-size: 16px;
  `}

`;

const LineItem = ({ description, amount }) => (
  <StyledLineItem>
    <div>{description}</div>
    <div>${amount}</div>
  </StyledLineItem>
);

export default LineItem;
