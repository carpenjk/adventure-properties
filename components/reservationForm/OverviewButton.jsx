import styled from 'styled-components';
import LinkButton from '../base/LinkButton';
import ReservationPrice from './ReservationPrice';

const StyledButtonLayout = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledTotal = styled.div`
  font-family: ${({ theme }) => theme.fonts.poppins};
  font-style: normal;
  font-weight: bold;
  font-size: ${({ theme }) => theme.fontSizes[2]}px;
  line-height: 150%;
  -webkit-letter-spacing: 0.05em;
  letter-spacing: 0.05em;
  color: ${({ theme }) => theme.colors.mainText};
`;

const StyledUnits = styled.div`
  font-family: ${({ theme }) => theme.fonts.openSans};
  color: inherit;
  text-decoration: underline;
`;

const StyledChar = styled.span`
  font-family: ${({ theme }) => theme.fonts.openSans};
  font-weight: normal;
  color: ${({ theme }) => theme.colors.link[0]};
  padding-left: 1em;
  padding-right: 1em;
  &:hover {
    color: ${({ theme }) => theme.colors.link[1]};
  }
`;

const OverviewButton = ({
  isAmount,
  price,
  unit,
  unitAmount,
  unitLabel,
  ...remProps
}) => (
  <LinkButton className="link" {...remProps}>
    <StyledButtonLayout>
      <ReservationPrice
        price={price.avg || price.today}
        unit={unit}
        variant="link"
      />
      {isAmount && (
        <>
          <StyledChar>x</StyledChar>
          <StyledUnits>{`${unitAmount} ${unitLabel}`}</StyledUnits>
          <StyledChar>|</StyledChar>
        </>
      )}
    </StyledButtonLayout>
    {isAmount && (
      <StyledTotal>${price.total.toLocaleString('en-US')} Total</StyledTotal>
    )}
  </LinkButton>
);

export default OverviewButton;
