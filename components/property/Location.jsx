import { useEffect, useState } from 'react';
// import L from 'leaflet';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import styled from 'styled-components';
import 'leaflet/dist/leaflet.css';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import icon from 'leaflet/dist/images/marker-icon.png';

const StyledLocation = styled.div`
  max-width: 350px;
  width: 100%;

  > div {
    height: 250px;
    width: 100%;
  }
`;

const StyledHeader = styled.h3`
  color: red;
  line-height: 200%;
  margin: 0;
`;

const Location = ({ location, locationName }) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    const L = require('leaflet');

    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
      iconUrl: require('leaflet/dist/images/marker-icon.png'),
      shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
    });
  }, []);

  useEffect(() => setIsMounted(true), []);
  const position = [location.lat, location.lon];

  if (!isMounted) {
    return (
      <StyledLocation>
        <StyledHeader>{locationName}</StyledHeader>
        <div />
      </StyledLocation>
    );
  }
  return (
    <StyledLocation>
      <StyledHeader>{locationName}</StyledHeader>
      <Map center={position} zoom={13} scrollWheelZoom={false} dragging={false}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </Map>
    </StyledLocation>
  );
};

export default Location;
