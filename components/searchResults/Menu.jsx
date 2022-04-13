import styled from 'styled-components';
import { getProp } from 'dataweaver';
import ActionButton from '../base/ActionButton';
import Spacer from '../base/Spacer';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-top: 16px;
  padding-bottom: 16px;
`;
const StyledMenuGroup = styled.div`
  display: flex;
  justify-content: ${getProp('justifyContent')};
  align-items: ${getProp('alignContent')};
`;
const Menu = () => (
  <StyledContainer>
    <StyledMenuGroup justifyContent="flex-start" alignItems="center">
      <ActionButton tw={{ variant: 'results' }}>
        <img src="/static/assets/searchResults/filter.svg" alt="filter" />
        <Spacer space="4px" />
        <span>Filters</span>
      </ActionButton>
    </StyledMenuGroup>
    <StyledMenuGroup justifyContent="flex-end" alignItems="center">
      <ActionButton tw={{ variant: 'results' }}>
        <img src="/static/assets/searchResults/sortDesc.svg" alt="filter" />
        <Spacer space="4px" />
        <span>Price</span>
      </ActionButton>
      <Spacer space="8px" />
      <ActionButton tw={{ variant: 'results' }}>
        <img src="/static/assets/searchResults/sortDesc.svg" alt="filter" />
        <Spacer space="4px" />
        <span>Nearest</span>
      </ActionButton>
    </StyledMenuGroup>
  </StyledContainer>
);

export default Menu;
