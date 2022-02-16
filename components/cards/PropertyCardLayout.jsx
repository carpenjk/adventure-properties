import styled, { ThemeContext } from 'styled-components';
import { breakpoint } from 'themeweaver';

import PhotoLayout from './PhotoLayout';
import PropertyDescription from './PropertyDescription';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  flex: none;
  padding: ${({ theme }) => theme.space[2]}px;
  border-radius: 5px;
  max-width: 341px;

  ${breakpoint(1)`
    height: auto;
    max-width: none;
    flex-direction: row;

  `}
  ${breakpoint(2)`
    align-items: stretch;
    max-width: 341px;
  `}
`;

const StyledDescWrapper = styled.div`
  display: none;

  ${breakpoint(1)`
    display: flex;
    align-items: center;
    justify-content: center;    
  `}
  ${breakpoint(2)`
    display: none;
  `}
`;

const PropertyCardLayout = (props) => {
  const { property, scale, innerRef } = props;
  return (
    <StyledContainer ref={innerRef} scale={scale}>
      <PhotoLayout
        property={property}
        currSymbol={property.currSymbol}
        price={property.displayPrice}
        unit={property.unit}
      />
      <StyledDescWrapper>
        <PropertyDescription description={property.description} />
      </StyledDescWrapper>
    </StyledContainer>
  );
};

export default PropertyCardLayout;
