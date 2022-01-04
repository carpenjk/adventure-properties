import styled from 'styled-components';
import { breakpoint } from 'themeweaver';
import LinkButton from '../base/LinkButton';
import InvoiceContent from './InvoiceContent';
import InvoiceHeader from './InvoiceHeader';
import { theme } from '../../theme';

const StyledPreview = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 8px;

  ${breakpoint(1)`
    padding: 1px;
  `}
`;

const StyledEditWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  text-decoration: underline;
  padding-top: 16px;

  > button {
    font-family: ${({ theme }) => theme.fonts.openSans};
    font-size: ${({ theme }) => theme.fontSizes[2]}
    font-weight: normal;
  }
`;

const ReservePreview = (props) => {
  const { onEdit, unit, price, showTitle, title, total, unitAmount } = props;

  return (
    <StyledPreview>
      {showTitle && (
        <InvoiceHeader unit={unit} price={price} title={title} showTitle />
      )}
      <InvoiceContent
        price={price}
        unit={unit}
        unitAmount={unitAmount}
        total={total}
      />
      <StyledEditWrapper>
        <LinkButton onClick={onEdit} color={theme.colors.primary}>
          edit reservation
        </LinkButton>
      </StyledEditWrapper>
    </StyledPreview>
  );
};

export default ReservePreview;
