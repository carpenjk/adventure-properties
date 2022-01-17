import dynamic from 'next/dynamic';
import { Media } from '../../Media';
import ContentContainer from './ContentContainer';
import AttributeList from './AttributeList';
import AttributesSummary from './AttributesSummary';
import ReservationForm from '../reservationForm/ReservationForm';
import PropertyDescription from './PropertyDescription';
import PropertyDetailCategory from './PropertyDetailCategory';
import PropertyDetails from './PropertyDetails';
import PropertyTitle from './PropertyTitle';

// Load location on the client. Errors on server
const Location = dynamic(() => import('../../components/property/Location'), {
  ssr: false,
});

const PropertyContent = (props) => {
  const { attributes, availability, reservation, reservationControl } = props;
  const {
    baths,
    beds,
    description,
    guests,
    city,
    state,
    location,
    propertyType,
    title,
  } = attributes;

  //* ******* helpers ****************
  const getAttributeList = (attribute) => {
    if (!attributes || !attributes[attribute]) {
      return [];
    }
    return attributes[attribute].map((item) => <li key={item}>{item}</li>);
  };

  const getNearbyActivities = () => {
    if (
      !attributes ||
      !attributes.nearbyActivities ||
      attributes.nearbyActivities.length === 0
    ) {
      return [];
    }
    return attributes.nearbyActivities.map((item) => (
      <li key={item}>{item}</li>
    ));
  };

  return (
    <ContentContainer>
      <PropertyDetails>
        <PropertyTitle title={title} />
        <AttributesSummary
          guests={guests}
          beds={beds}
          baths={baths}
          propertyType={propertyType}
        />
        <PropertyDescription>{description}</PropertyDescription>
        <PropertyDetailCategory title="Location">
          <Location location={location} locationName={`${city}, ${state}`} />
        </PropertyDetailCategory>
        <PropertyDetailCategory title="Amenities">
          <AttributeList>{getAttributeList('amenities')}</AttributeList>
        </PropertyDetailCategory>
        <PropertyDetailCategory title="Experience">
          <AttributeList>{getAttributeList('experience')}</AttributeList>
        </PropertyDetailCategory>
        <PropertyDetailCategory title="Nearby Activities">
          <AttributeList>{getNearbyActivities()}</AttributeList>
        </PropertyDetailCategory>
        <PropertyDetailCategory title="Availability">
          <AttributeList>{getAttributeList('availability')}</AttributeList>
        </PropertyDetailCategory>
      </PropertyDetails>
      <Media greaterThanOrEqual="1">
        <ReservationForm
          availability={availability}
          reservation={reservation}
          control={reservationControl}
          title={title}
          maxGuests={guests}
        />
      </Media>
    </ContentContainer>
  );
};

export default PropertyContent;
