import { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';

import { breakpoint } from 'themeweaver';
import withFilterGroup from './WithFilterGroup';
import Checkbox from '../base/input/Checkbox';

const StyledList = styled.ul`
  margin-left: 10px;
  display: grid;
  grid-gap: 30px;
  grid-template-columns: repeat(auto-fit, 175px);
  justify-content: center;
  width: 100%;

  ${breakpoint(1)`
    justify-content: start;
  `}
`;

const CheckFilters = (props) => {
  const { filters, valueFunctions } = props;
  const theme = useContext(ThemeContext);
  return (
    <StyledList>
      {filters.map((filter) => (
        <li key={filter.id}>
          <Checkbox
            id={filter.id}
            name={filter.name}
            label={filter.label}
            input={filter}
            valueFunctions={valueFunctions}
            fg={theme.colors.primary}
            bg={theme.colors.white}
            fg_checked={theme.colors.white}
            bg_checked={theme.colors.primary}
          />
        </li>
      ))}
    </StyledList>
  );
};

export default withFilterGroup(CheckFilters);
