import { getProp } from 'dataweaver';
import ActionButton from '../base/ActionButton';
import Spacer from '../base/Spacer';

const StyledMenuGroup = styled.div`
  display: flex;
  justify-content: ${getProp('justifyContent')};
  align-items: ${getProp('alignContent')};
`;
const DashboardButtons = () => (
  <>
    <StyledMenuGroup justifyContent="flex-start" alignItems="center">
      <ActionButton
        tw={{ variant: 'results' }}
        onClick={() => setIsSearchMenuOpen((prev) => !prev)}
      >
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
  </>
);

export default DashboardButtons;
