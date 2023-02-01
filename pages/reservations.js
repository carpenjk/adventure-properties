import Head from 'next/head';
import { getSession } from 'next-auth/react';
import styled from 'styled-components';
import { withDates } from '@carpenjk/date-utils';
import { Section } from '@carpenjk/base/semantic';
import { mediaStyles } from '../Media';
import ReservationsContent from '../components/reservations/ReservationsContent';
import Login from '../components/Login';
import { fetchReservationsWithProperty } from '../utils/adapters/reservations';

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
  const reservationWithDates = reservations
    ? withDates(reservations)
    : undefined;
  return (
    <>
      <Head>
        <title>Reservations</title>
        <style
          type="text/css"
          dangerouslySetInnerHTML={{ __html: mediaStyles }}
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover"
        />
      </Head>
      <Section tw={{ variant: 'reservations' }} position="relative">
        {!session && <Login />}
        {session && (
          <StyledContent>
            <ReservationsContent
              reservations={reservationWithDates}
              itemsPerPage={5}
            />
          </StyledContent>
        )}
      </Section>
    </>
  );
};
export default Reservations;
