import styled from 'styled-components';
import CaptionItem from './CaptionItem';

const StyledAttributes = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  margin: 10px 0 10px 0;
  p {
    margin: 0;
  }
`;
const StyledCaptionItem = styled.span`
  display: flex;
  align-items: center;
  /* text/small2 */
  padding-left: 0.4rem;
  padding-right: 0.4rem;
  font-family: Poppins;
  font-style: normal;
  font-weight: 500;
  font-size: 11px;
  color: var(--lightText);
`;

const Price = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin: 0;
  max-width: 50px;
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 1.6rem;
  color: var(--mainText);
  letter-spacing: 0.2em;
  > * {
    letter-spacing: initial;
  }
`;

const StyledTags = styled.ul`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  list-style: none;
`;
const StyledTag = styled.li`
  color: var(--action);
  /* text/small2 */

  font-family: Poppins;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  letter-spacing: 0.02em;
`;

const StyledLocation = styled.div`
  display: flex;
  justify-content: flex-end;
  font-family: 'Walter Turncoat', cursive;
  font-style: normal;
  font-weight: normal;
  font-size: 17px;
  line-height: 24px;
  color: var(--mainText);
  text-transform: uppercase;
`;

const PropertyCaption = (props) => {
  const {
    beds,
    baths,
    currSymbol,
    maxGuests,
    price,
    location,
    propertyType,
    tags,
    unit,
  } = props;
  return (
    <>
      <StyledAttributes>
        <Price>
          {`${currSymbol}${price}`}
          <CaptionItem caption={` /${unit}`} />
        </Price>
        <CaptionItem
          caption={`${maxGuests} Guest${maxGuests > 1 ? 's' : ''}`}
        />
        <CaptionItem caption={`${beds} Bed${beds > 1 ? 's' : ''}`} />
        <CaptionItem caption={`${baths} Bath${baths > 1 ? 's' : ''}`} />
        <CaptionItem caption={propertyType} />
      </StyledAttributes>
      <StyledTags>
        <StyledTag>
          {tags.reduce((result, tag, index) => {
            const suffix = index === tags.length - 1 ? '...' : ', ';
            return result + tag + suffix;
          }, [])}
        </StyledTag>
      </StyledTags>
      <StyledLocation>{location}</StyledLocation>
    </>
  );
};

export default PropertyCaption;
