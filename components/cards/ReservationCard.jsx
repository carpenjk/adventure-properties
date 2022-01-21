import Card from './Card';
import ReservationCardLayout from './ReservationCardLayout';

const ReservationCard = (props) => {
  const {
    property,
    reservation,
    cardRef,
    innerRef,
    scale,
    scaleOnHover,
    scaleOnFocus,
    url,
  } = props;

  return (
    <Card innerRef={cardRef} url={url}>
      <ReservationCardLayout
        property={property}
        reservation={reservation}
        scaleOnHover={scaleOnHover}
        scaleOnFocus={scaleOnFocus}
        scale={scale}
        innerRef={innerRef}
        cardRef={cardRef}
      />
    </Card>
  );
};

export default ReservationCard;
