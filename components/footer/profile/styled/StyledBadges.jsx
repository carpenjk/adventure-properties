import styled from 'styled-components';
import { breakpoint, getProp } from '@carpenjk/prop-x/css';

export const StyledBadges = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-items: center;
  width: calc(100% + ${getProp('gap')});
  margin-left: -${getProp('gap')};

  > * {
    margin-left: ${getProp('gap')};
    margin-bottom: ${getProp('gap')};
  }

  ${breakpoint(1)`
    width: calc(100% + ${getProp('gap')});
    margin-left: -${getProp('gap')};
    > * {
      margin-left: ${getProp('gap')};
      margin-bottom: ${getProp('gap')};
    }
  `}
`;
