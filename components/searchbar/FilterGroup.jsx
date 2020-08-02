import styled from 'styled-components';
import FilterHeader from '../FilterHeader';

const FilterGroup = (props) => {
  const StyleWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 500px;
  `;
  const FilterContainer = styled.div`
    display: flex;
    flex-direction: row;
  `;

  return (
    <StyleWrapper key="wrapper">
      <FilterHeader headerText={props.title} key="title" />
      <FilterContainer>{props.children}</FilterContainer>
    </StyleWrapper>
  );
};

export default FilterGroup;
