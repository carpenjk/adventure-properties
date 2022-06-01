import styled from 'styled-components';

const StyledWrapper = styled.div`
  .react-datepicker {
    border: 10px solid #f8f8f8;
  }
  .react-datepicker * {
    color: ${({ theme }) => theme.colors.lightText};
  }

  .react-datepicker__triangle {
    left: 50%;
  }

  .react-datepicker-popper[data-placement^='bottom']
    .react-datepicker__triangle {
    border-bottom-color: #ccc;
  }

  .react-datepicker-popper[data-placement^='bottom']
    .react-datepicker__triangle::before {
    border-bottom-color: #ccc;
  }

  .react-datepicker__header {
    background-color: ${({ theme }) => theme.colors.white};
  }

  .react-datepicker__navigation {
    border: 1rem solid transparent;
    width: 1px;
    height: 1px;
    top: 9.6px;
  }

  .react-datepicker__navigation--previous {
    border-right-color: #ccc;
  }

  .react-datepicker__navigation--next {
    border-left-color: #ccc;
  }

  .react-datepicker__current-month {
    font-size: 2rem;
    font-weight: bold;
  }

  .react-datepicker__day-names {
    display: flex;
  }
  .react-datepicker__day-name {
    flex: 1;
    font-size: 1.6rem;
    margin-top: 1rem;
  }

  .react-datepicker__week {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .react-datepicker__day {
    width: 4rem;
    height: 4rem;
    margin: 0;

    display: flex;
    justify-content: center;
    align-items: center;

    font-family: 'Poppins', sans-serif;
    font-size: 1.4rem;
    letter-spacing: 0.025em;

    color: ${({ theme }) => theme.colors.primary[0]};
    background-color: #f7f7f7;
  }

  .react-datepicker__day.react-datepicker__day--highlighted {
    background-color: ${({ theme }) => theme.colors.primary[0]};
    color: ${({ theme }) => theme.colors.white};
  }

  .react-datepicker__day--keyboard-selected {
    background-color: ${({ theme }) => theme.colors.lightBackground};
    color: ${({ theme }) => theme.colors.primary[0]};
    border: 2px solid ${({ theme }) => theme.colors.primary[0]};
  }

  .react-datepicker__day:focus-visible {
    outline: none;
  }

  .react-datepicker__day--selected {
    background-color: ${({ theme }) => theme.colors.primary[0]};
    color: ${({ theme }) => theme.colors.white};
  }
  .react-datepicker__month--selecting-range .react-datepicker__day--selected {
    background-color: ${({ theme }) => theme.colors.primary[0]};
    color: ${({ theme }) => theme.colors.white};
  }

  .react-datepicker__month--selecting-range .react-datepicker__day:hover {
    background-color: ${({ theme }) => theme.colors.primary[0]};
    color: ${({ theme }) => theme.colors.white};
  }

  .react-datepicker__day:hover {
    background-color: ${({ theme }) => theme.colors.primary[0]};
    color: ${({ theme }) => theme.colors.white};
  }

  .react-datepicker__day--in-selecting-range {
    background-color: ${({ theme }) => theme.colors.primary[0]};
    color: ${({ theme }) => theme.colors.white};
  }

  .react-datepicker__day--in-range {
    background-color: ${({ theme }) => theme.colors.primary[0]};
    color: ${({ theme }) => theme.colors.white};
  }

  .react-datepicker__month--selecting-range .react-datepicker__day--in-range {
    background-color: ${({ theme }) => theme.colors.primary[0]};
    color: ${({ theme }) => theme.colors.white};
  }
  .react-datepicker__month--selecting-range
    .react-datepicker__day--selecting-range-start {
    background-color: ${({ theme }) => theme.colors.primary[0]};
    color: ${({ theme }) => theme.colors.white};
  }
  .react-datepicker__day--selecting-range-end {
    font-weight: bold;
  }
  .react-datepicker__day--disabled {
    background-color: ${({ theme }) => theme.colors.disabledBackground};
    color: ${({ theme }) => theme.colors.tertiary};
  }
  .react-datepicker__day--disabled:hover {
    background-color: ${({ theme }) => theme.colors.disabledBackground};
    color: ${({ theme }) => theme.colors.tertiary};
  }
`;

const DatePickerStyles = ({ children }) => (
  <StyledWrapper>{children}</StyledWrapper>
);

export default DatePickerStyles;
