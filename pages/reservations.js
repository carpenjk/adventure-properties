import Head from 'next/head';
import { getSession } from 'next-auth/client';
import styled from 'styled-components';
import { mediaStyles } from '../Media';
import ReservationsContent from '../components/reservations/ReservationsContent';
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
  justify-content: flex-start;
  align-items: center;
`;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const { user } = session || {};
  const { query = {} } = context;
  if (user) {
    const resWithPropeties = await fetchReservationsWithProperty({
      ...query,
      user: user.email,
    });
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
  console.log('🚀 ~ file: reservations.js ~ line 47 ~ Reservations ~ res', res);
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
        <Section tw={{ variant: 'reservations' }} position="relative">
          {!session && <Login />}
          {session && (
            <StyledContent>
              <ReservationsContent reservations={res} itemsPerPage={5} />
            </StyledContent>
          )}
        </Section>
      </main>
    </>
  );
};
export default Reservations;
