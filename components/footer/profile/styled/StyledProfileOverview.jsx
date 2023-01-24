import styled from 'styled-components';
import { breakpoint } from '@carpenjk/prop-x/css';

export const StyledProfileOverview = styled.div`
  width: 100%;
  max-width: 550px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${breakpoint(1)`
    padding-left: 8px;
  `}
`;
