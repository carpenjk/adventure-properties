import Head from 'next/head';
import { signIn, useSession } from 'next-auth/client';
import styled from 'styled-components';
import { mediaStyles } from '../Media';
import useReservations from '../components/adapters/reservation/useReservations';

import ReservationList from '../components/property/ReservationList';

const StyledContent = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
  align-items: center;
  justify-content: center;
`;

const Reservations = () => {
  const [session, loading] = useSession();
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
        {session && (
          <StyledContent>
            <ReservationList />
          </StyledContent>
        )}
        {!session && <div>You must be logged in the view reservations</div>}
      </main>
    </>
  );
};

export default Reservations;
