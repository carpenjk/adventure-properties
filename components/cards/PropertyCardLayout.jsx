import styled from 'styled-components';
import PropertyCaption from './PropertyCaption';

const StyledLargeLayout = styled.div`
  display: flex;
  flex: none;
  flex-direction: column;
  justify-content: space-around;
  align-content: stretch;
  width: 100%;

  background: #ffffff;
  box-sizing: border-box;

  padding: 8px;

  h1 {
    flex: none;
    margin: 0 0 1.5rem 0;
    font-family: Open Sans;

    display: flex;
    align-items: center;
    color: #444649;
    font-family: Open Sans;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 150%;
    letter-spacing: 0.025em;
    text-align: left;
  }
  figure {
    margin: 0;
  }
  .image {
    grid-column: 1/5;
    grid-row: 2 / span 1;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }
  .footer {
    grid-column: 1/5;
    grid-row: 3 / span 1;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
const LargeLayout = ({ url, data }) => {
  const { heading, ...remData } = data;

  return (
    <StyledLargeLayout>
      <h1 className="cardHeader">{heading}</h1>
      <figure>
        <div className="image">
          <img src={url} alt={heading} />
        </div>
        <figcaption>
          <PropertyCaption {...remData} />
        </figcaption>
      </figure>
    </StyledLargeLayout>
  );
};

const PropertyCardLayout = ({ picUrl, variant, data }) => {
  switch (variant) {
    case 'large':
      return <LargeLayout url={picUrl()} data={data} />;
    default:
      return <div>Loading</div>;
  }
};

export default PropertyCardLayout;
