import styled from 'styled-components';
import { ActionButton, LinkButton } from '@carpenjk/base/button';
import { Spacer } from '@carpenjk/base/layout';
import Link from 'next/link';

const StyledEditWrapper = styled.div`
  display: ${({ display }) => display};
  display: flex;
  justify-content: flex-end;
  text-decoration: underline;
  width: 100%;
  height: 20px;

  > button,
  a {
    font-family: ${({ theme }) => theme.fonts.openSans};
    letter-spacing: 0.08em;
    font-size: ${({ theme }) => theme.fontSizes[2]}px;
    font-weight: normal;
    color: ${({ theme }) => theme.colors.link[0]};
  }
  > button:hover,
  a:hover {
    color: ${({ theme }) => theme.colors.link[1]};
  }
`;

const StyledButtonWrapper = styled.div`
  display: ${({ display }) => display};
  justify-content: flex-end;
  align-items: center;
  width: 100%;
`;

const ReserveButtons = ({
  onEdit,
  onReserve,
  reserveDisabled,
  showEdit,
  showReserve,
}) => (
  <>
    <StyledEditWrapper>
      {showEdit && <LinkButton onClick={onEdit}>edit reservation</LinkButton>}
      {!showEdit && (
        <LinkButton as={Link} href="/reservations" onClick={onEdit}>
          go to my reservations
        </LinkButton>
      )}
    </StyledEditWrapper>
    <Spacer vertical space="20px" />
    <StyledButtonWrapper display={showReserve ? 'flex' : 'none'}>
      <ActionButton
        type="submit"
        tw={{ variant: 'reserve' }}
        onClick={onReserve}
        disabled={reserveDisabled}
      >
        Reserve
      </ActionButton>
    </StyledButtonWrapper>
  </>
);

export default ReserveButtons;
