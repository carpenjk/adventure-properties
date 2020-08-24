import styled from 'styled-components';
import FilterHeader from '../FilterHeader';

const FilterGroup = (props) => {
  const StyleWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 40px;
  `;

  return (
    <StyleWrapper key="wrapper">
      <FilterHeader headerText={props.title} key="title" />
      {props.children}
    </StyleWrapper>
  );
};

export default FilterGroup;
