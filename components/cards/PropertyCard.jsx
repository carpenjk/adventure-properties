import Card from './Card';
import PropertyCardLayout from './PropertyCardLayout';

const PropertyCard = (props) => {
  const {
    property,
    cardRef,
    innerRef,
    scale,
    scaleOnHover,
    scaleOnFocus,
  } = props;

  const { url } = property;

  return (
    <Card
      innerRef={cardRef}
      url={url}
      scaleOnHover={scaleOnHover}
      scaleOnFocus={scaleOnFocus}
      scale={scale}
    >
      <PropertyCardLayout property={property} innerRef={innerRef} />
    </Card>
  );
};

export default PropertyCard;
