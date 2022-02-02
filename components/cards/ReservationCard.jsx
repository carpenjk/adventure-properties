import Card from './Card';
import ReservationCardLayout from './ReservationCardLayout';

const ReservationCard = (props) => {
  const {
    reservation,
    cardRef,
    innerRef,
    scale,
    scaleOnHover,
    scaleOnFocus,
  } = props;

  const { url } = reservation.property;

  return (
    <Card
      innerRef={cardRef}
      url={url}
      scaleOnHover={scaleOnHover}
      scaleOnFocus={scaleOnFocus}
      scale={scale}
    >
      <ReservationCardLayout reservation={reservation} innerRef={innerRef} />
    </Card>
  );
};

export default ReservationCard;
