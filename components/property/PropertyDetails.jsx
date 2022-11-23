import styled from 'styled-components';
import { breakpoint } from '@carpenjk/prop-x/css';

const StyledDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex 0 1 770px;
  width: 100%;
  
  
  > * {
    padding-bottom: ${({ theme }) => theme.space[5]}px;
  }

  ${breakpoint(1)`
    min-width: 400px;
    padding: ${({ theme }) => theme.space[5]}px;
  `}
`;

const PropertyDetails = ({ children }) => (
  <StyledDetails>{children}</StyledDetails>
);

export default PropertyDetails;
