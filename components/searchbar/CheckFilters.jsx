import { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';

import { breakpoint } from 'themeweaver';
import FormikCheckbox from '../base/input/FormikCheckbox';

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
  const { filters, name } = props;
  const theme = useContext(ThemeContext);
  return (
    <StyledList>
      {filters.map((filter) => (
        <li key={filter.id}>
          <FormikCheckbox
            tw={{ variant: 'searchBar' }}
            name={name}
            value={filter.label}
            label={filter.label}
            input={filter}
            fg={theme.colors.primary[0]}
            bg={theme.colors.white}
            fgChecked={theme.colors.white}
            bgChecked={theme.colors.primary[0]}
          />
        </li>
      ))}
    </StyledList>
  );
};

export default CheckFilters;
