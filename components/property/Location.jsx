import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import styled from 'styled-components';

const StyledLocation = styled.div`
  > div {
    width: 350px;
    max-width: 350px;
    height: 250px;
    background-color: gray;
  }
`;

const StyledHeader = styled.h3`
  color: red;
`;

const position = [51.505, -0.09];
const Location = ({ location }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  if (!isMounted) {
    return (
      <StyledLocation>
        <StyledHeader>{location}</StyledHeader>
        <div />
      </StyledLocation>
    );
  }
  return (
    <StyledLocation>
      <StyledHeader>{location}</StyledHeader>
      <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
      ,
    </StyledLocation>
  );
};

export default Location;
