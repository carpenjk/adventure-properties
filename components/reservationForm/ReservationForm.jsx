import styled from 'styled-components';
import { breakpoint } from 'themeweaver';

const StyledReserveForm = styled.div`
  position: fixed;
  bottom: 0;
  height: 100px;
  width: 100%;
  border: 5px solid ${({ theme }) => theme.colors.secondaryText};
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.white};
  z-index: 999999;

  ${breakpoint(1)`
  position: relative;
  height: 600px;
  flex: 1 1 400px;
  width: auto;
  min-width: 300px;
  max-width: 430px;
  `}
`;

const ReservationForm = (props) => {
  const { a } = props;
  return <StyledReserveForm />;
};

export default ReservationForm;
