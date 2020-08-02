import styled from 'styled-components';

const StyledFilterHeader = styled.h1`
  display: block;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 150%;
  letter-spacing: 0.025em;
  color: var(--mainText);
`;

const FilterHeader = (props) => {
  return <StyledFilterHeader>{props.headerText}</StyledFilterHeader>;
};

export default FilterHeader;
