import clientPromise from '../mongodb';
import { fetchProperties } from '../../components/adapters/property/property';

export async function fetchReservations(user) {
  const client = await clientPromise;
  const reservations = await client
    .db()
    .collection('reservations')
    .find({ userID: user })
    .sort({ arriveDate: 1 })
    .toArray();
  return reservations;
}

export async function fetchReservationsWithProperty(user) {
  const reservations = await fetchReservations(user);
  const propList = reservations.map((r) => r.cmsID);
  const properties = await fetchProperties(propList);
  const resWithPropeties = reservations.map((r) => ({
    ...r,
    property: properties.find((p) => p.cmsID === r.cmsID),
  }));
  return resWithPropeties;
}
