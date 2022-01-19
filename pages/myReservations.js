import { useState } from 'react';
import styled from 'styled-components';

import PropertyList from '../components/property/PropertyList';

const StyledContent = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
  align-items: center;
  justify-content: center;
`;

const MyReservations = () => {
  const [properties, setProperties] = useState();
  return (
    <>
      <Head>
        <title>Property</title>
        <style
          type="text/css"
          dangerouslySetInnerHTML={{ __html: mediaStyles }}
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <main style={{ width: '100%' }}>
        <StyledContent>
          {properties.map((property) => (
            <PropertyList properties={property} />
          ))}
        </StyledContent>
      </main>
    </>
  );
};

export default MyReservations;
