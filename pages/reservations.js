import Head from 'next/head';
import { useSession } from 'next-auth/client';
import styled from 'styled-components';
import { mediaStyles } from '../Media';
import ReservationContent from '../components/cards/ReservationContent';
import Spinner from '../components/base/Spinner';
import Login from '../components/base/login';

const StyledContent = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1080px;
  align-items: center;
  justify-content: center;
`;

const Reservations = () => {
  const [session, loading] = useSession();
  return (
    <>
      <Head>
        <title>Reservations</title>
        <style
          type="text/css"
          dangerouslySetInnerHTML={{ __html: mediaStyles }}
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <main style={{ width: '100%' }}>
        {loading && <Spinner />}
        {!loading && !session && <Login />}
        {session && (
          <StyledContent>
            <ReservationContent />
          </StyledContent>
        )}
      </main>
    </>
  );
};

export default Reservations;
