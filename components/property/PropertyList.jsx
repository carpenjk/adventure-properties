import styled from 'styled-components';
import { breakpoint } from 'themeweaver';
import Property from '../../pages/properties/[id]';
import PropertyCardLayout from '../cards/PropertyCardLayout';

const StyledContent = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-direction: column;
  margin: 0;

  ${breakpoint(2)`
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;

  `}
`;

const PropertyList = ({ properties }) => (
  <StyledContent>
    {properties.map((property) => (
      <Property
        property={property}
        cmsId={property.sys.id} //! remove
        scale={1.11}
        scaleOnHover={[false, false, true]}
        scaleOnFocus={[false, false, true]}
        showDescription={br.current.width < br.br[2]} //! investigate
        innerRef={undefined} //! is this needed?
        cardLayout={() => (
          <PropertyCardLayout
            property={property}
            variant="large"
            data={undefined} //! should be in property
            picUrl={undefined} //! should be in property
          />
        )}
      />
    ))}
  </StyledContent>
);

export default PropertyList;
