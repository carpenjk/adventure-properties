import styled from 'styled-components';
import { breakpoint } from 'themeweaver';
import PropertyCard from '../../cards/PropertyCard';

const StyledContainer = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0;
`;

const StyledListItem = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  max-width: 466px;
  padding-top: ${({ theme }) => theme.space[2]}px;
  padding-bottom: ${({ theme }) => theme.space[2]}px;

  ${breakpoint(1)`
    flex: none;
    width: 100%;
    max-width: none;
  `}
`;

const SearchResults = (props) => {
  const { results } = props;
  return (
    <StyledContainer>
      {results.map((item) => (
        <StyledListItem key={item.cmsID}>
          <PropertyCard
            property={item}
            scale={1.02}
            scaleOnHover={[true, true, true]}
            scaleOnFocus={[true, true, true]}
            showDescription
            layoutDirection={['column', 'row', 'row']}
          />
        </StyledListItem>
      ))}
    </StyledContainer>
  );
};

export default SearchResults;
