import styled from 'styled-components';

const StyledAttributes = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0 10px 0;
  p {
    margin: 0;
  }
`;
const CaptionItem = styled.span`
  display: flex;
  align-items: center;
  /* text/small2 */
  font-family: Poppins;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  color: var(--lightText);
`;

const Price = styled.p`
  display: inline-block;
  margin: 0;
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 1.8rem;
  color: var(--mainText);
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
  return (
    <React.Fragment>
      <StyledAttributes>
        <CaptionItem>
          <Price>$239</Price> / night
        </CaptionItem>
        <CaptionItem>2 Guests</CaptionItem>
        <CaptionItem>1 Bed</CaptionItem>
        <CaptionItem>1 Bath</CaptionItem>
        <CaptionItem>Cabin</CaptionItem>
      </StyledAttributes>
      <StyledTags>
        <StyledTag>
          Skiing, Snowshoeing, Birding, Snowmobiling, Hiking...
        </StyledTag>
      </StyledTags>
      <StyledLocation>Sugarloaf, ME</StyledLocation>
    </React.Fragment>
  );
};

export default PropertyCaption;
