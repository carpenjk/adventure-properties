import styled from 'styled-components';
import 'leaflet/dist/leaflet.css';
import LeafletMap from './LeafletMap';

const StyledLocation = styled.div`
  max-width: 350px;
  width: 100%;

  > div {
    height: 250px;
    width: 100%;
  }
`;

const StyledHeader = styled.h3`
  color: ${({ theme }) => theme.colors.secondaryText};
  line-height: 200%;
  margin: 0;
`;

const Location = ({ location, locationName }) => {
  const position = [location[1], location[0]];
  return (
    <StyledLocation>
      <StyledHeader>{locationName}</StyledHeader>
      <LeafletMap position={position} />
    </StyledLocation>
  );
};

export default Location;
