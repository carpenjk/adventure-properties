import Head from 'next/head';
import { getSession } from 'next-auth/client';
import styled from 'styled-components';
import { mediaStyles } from '../Media';
import ReservationContent from '../components/cards/ReservationContent';
import Login from '../components/base/login';
import { withDates } from '../utils/dates';
import { fetchReservationsWithProperty } from '../utils/adapters/reservations';
import Section from '../components/base/semantic/Section';

const StyledContent = styled.div`
  padding: ${({ theme }) => theme.space[2]}px;
  margin: auto;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1080px;
  align-items: center;
  justify-content: center;
`;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (session && session.user) {
    const resWithPropeties = await fetchReservationsWithProperty(
      session.user.email
    );
    return {
      props: {
        session,
        reservations: JSON.parse(JSON.stringify(resWithPropeties)),
      },
    };
  }
  return {
    props: {
      session,
    },
  };
}

const Reservations = ({ reservations, session }) => {
  const res = reservations ? withDates(reservations) : undefined;
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
        <Section semKey="reservations" position="relative">
          {/* {loading && <Spinner />} */}
          {/* {!loading && !session && <Login />} */}
          {!session && <Login />}
          {session && (
            <StyledContent>
              <ReservationContent reservations={res} />
            </StyledContent>
          )}
        </Section>
      </main>
    </>
  );
};
export default Reservations;
