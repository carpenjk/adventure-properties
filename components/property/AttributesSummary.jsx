import styled from 'styled-components';
import { breakpoint } from '@carpenjk/prop-x/css';

const StyledAttributesSummary = styled.ul`
  width: 100%;
  margin: 0;
  display: flex;
  justify-content: space-between;

  padding-left: ${({ theme }) => theme.space[2]}px;
  padding-right: ${({ theme }) => theme.space[2]}px;

  ${breakpoint(1)`

  `};

  > li {
    list-style: none;
    display: flex;

    font-family: Open Sans;
    font-size: ${({ theme }) => theme.fontSizes[2]}px;
    line-height: 150%;
    align-items: center;
    letter-spacing: 0.025em;
    color: ${({ theme }) => theme.colors.lightText};
  }
`;

const AttributesSummary = (props) => {
  const { guests, beds, baths, propertyType } = props;
  return (
    <StyledAttributesSummary>
      <li>{guests} Guests</li>
      <li>{beds} Bed</li>
      <li>{baths} Bath</li>
      <li>{propertyType}</li>
    </StyledAttributesSummary>
  );
};

export default AttributesSummary;
