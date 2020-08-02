import styled from 'styled-components';
import PropertyCaption from './PropertyCaption';
const StyledLargeLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  align-content: stretch;
  max-width: 445px;
  max-height: 420px;
  background: #ffffff;
  box-sizing: border-box;
  h1 {
    flex: none;
    margin: 0 0 1.5rem 0;
    grid-column: 1 / 5;
    grid-row: 1 / span 1;
  }
  figure {
    margin: 0;
  }
  .image {
    min-height: 275px;
    min-width: 380px;
    grid-column: 1/5;
    grid-row: 2 / span 1;
    background-color: lightBlue;
  }
  .footer {
    grid-column: 1/5;
    grid-row: 3 / span 1;
  }
`;
const LargeLayout = () => {
  return (
    <StyledLargeLayout>
      <h1 className="cardHeader">3 Bdr With Amazing views</h1>
      <figure>
        <div className="image"></div>
        <figcaption>
          <PropertyCaption />
        </figcaption>
      </figure>
    </StyledLargeLayout>
  );
};

const PropertyCardLayout = ({ style }) => {
  switch (style) {
    case 'large':
      return <LargeLayout />;
    default:
      return <div>Loading</div>;
  }
};

export default PropertyCardLayout;
