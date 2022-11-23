import dynamic from 'next/dynamic';
import { ContentContainer } from '@carpenjk/base/layout';
import { Media } from '../../Media';
import AttributeList from './AttributeList';
import AttributesSummary from './AttributesSummary';
import ReservationForm from '../reservationForm/ReservationForm';
import PropertyDescription from './PropertyDescription';
import PropertyDetailCategory from './PropertyDetailCategory';
import PropertyDetails from './PropertyDetails';
import PropertyTitle from './PropertyTitle';
import PropertyLayout from './PropertyLayout';

// Load location on the client. Errors on server
const Location = dynamic(() => import('../../components/property/Location'), {
  ssr: false,
});

const PropertyContent = (props) => {
  const {
    attributes,
    availability,
    reservation,
    reservationControl,
    onReservationReview,
  } = props;
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

  const amenities = getAttributeList('amenities');
  const experiences = getAttributeList('experience');
  const nearbyActivities = getNearbyActivities();
  const availabilities = getAttributeList('seasonality');
  const accesses = getAttributeList('access');

  return (
    <ContentContainer tw={{ variant: 'property' }}>
      <PropertyLayout>
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
          {amenities.length > 0 && (
            <PropertyDetailCategory title="Amenities">
              <AttributeList>{amenities}</AttributeList>
            </PropertyDetailCategory>
          )}
          {experiences.length > 0 && (
            <PropertyDetailCategory title="Experience">
              <AttributeList>{experiences}</AttributeList>
            </PropertyDetailCategory>
          )}

          {nearbyActivities.length > 0 && (
            <PropertyDetailCategory title="Nearby Activities">
              <AttributeList>{nearbyActivities}</AttributeList>
            </PropertyDetailCategory>
          )}

          {availabilities.length > 0 && (
            <PropertyDetailCategory title="Availability">
              <AttributeList>{availabilities}</AttributeList>
            </PropertyDetailCategory>
          )}

          {accesses.length > 0 && (
            <PropertyDetailCategory title="Access">
              <AttributeList>{accesses}</AttributeList>
            </PropertyDetailCategory>
          )}
        </PropertyDetails>
        <Media greaterThanOrEqual="1">
          <ReservationForm
            availability={availability}
            reservation={reservation}
            control={reservationControl}
            title={title}
            maxGuests={guests}
            onReview={onReservationReview}
          />
        </Media>
      </PropertyLayout>
    </ContentContainer>
  );
};

export default PropertyContent;
