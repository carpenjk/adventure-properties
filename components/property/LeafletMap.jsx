import { useEffect } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

const LeafletMap = ({ position }) => {
  // workaround for marker error
  useEffect(() => {
    /* eslint-disable global-require */
    const L = require('leaflet');
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
      iconUrl: require('leaflet/dist/images/marker-icon.png'),
      shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
    });
    /* eslint-enable global-require */
  }, []);

  return (
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
  );
};

export default LeafletMap;
