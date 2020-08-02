import styled from 'styled-components';
import FilterHeader from '../FilterHeader';
import { useState, useEffect, Component } from 'react';

const StyleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  > * {
    margin: 0 0 1rem 0;
  }
`;
const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 3px;
  & > * {
    margin: 0 0 1rem 0;
  }
  @media (${(props) => props.mobileBreakpoint}) {
    flex-direction: row;
    & > * {
      margin-right: 3rem;
    }
  }
`;

const withFilterGroup = (Filter) => {
  const WithFilterGroup = (props) => {
    const { mobileBreakpoint } = props;
    return (
      <StyleWrapper key="wrapper">
        <FilterHeader headerText={props.title} key="title" />
        <FilterContainer mobileBreakpoint={mobileBreakpoint}>
          <Filter {...props} />
        </FilterContainer>
      </StyleWrapper>
    );
  };
  return WithFilterGroup;
};

export default withFilterGroup;
