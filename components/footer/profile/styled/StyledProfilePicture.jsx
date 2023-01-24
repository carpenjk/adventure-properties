import styled from 'styled-components';
import { breakpoint } from '@carpenjk/prop-x/css';

export const StyledProfilePicture = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 25px;
  border-radius: 5px;
  min-width: 276px;

  ${breakpoint(1)`
  `}
`;
