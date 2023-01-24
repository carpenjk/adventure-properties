import styled from 'styled-components';
import { breakpoint } from '@carpenjk/prop-x/css';

export const StyledProfileInnerWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 18px;
  background-color: ${(props) => props.theme.colors.indigo2};
  border-radius: 5px;

  ${breakpoint(1)`
  flex-direction: row;
  justify-content: center;
  align-items: stretch;
  padding: 0 18px;
  margin-bottom: 40px;
  > *:first-child {
    flex: 0 0 45%;
  }
  > *:last-child {
    flex 1 1 55%;
  }
`}
`;
