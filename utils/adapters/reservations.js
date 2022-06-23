import clientPromise from '../mongodb';
import { fetchProperties } from '../../components/adapters/property/property';

const DEFAULT_PER_PAGE = 5;
export async function fetchReservations(params) {
  const { user, filter, page, itemsPerPage = DEFAULT_PER_PAGE } = params;
  const isPast = filter === 'past';
  const dt = new Date();
  const today = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate());
  const dateFilter = isPast ? { $lt: today } : { $gte: today };
  const skip = page > 1 ? (page - 1) * DEFAULT_PER_PAGE : 0;
  const query = { userID: user, arriveDate: dateFilter };
  const client = await clientPromise;
  const reservations = await client
    .db()
    .collection('reservations')
    .find(query)
    .sort({ arriveDate: isPast ? -1 : 1 })
    .skip(skip)
    .limit(Number(itemsPerPage))
    .toArray();

  let count;
  if (reservations.length > 0) {
    count = await client.db().collection('reservations').countDocuments(query);
  } else {
    count = 0;
  }

  return { items: reservations, count };
}

export async function fetchReservationsWithProperty(params) {
  const { filter } = params || {};
  const reservations = await fetchReservations(params);
  const { items, count } = reservations;
  const propList = items.map((r) => r.cmsID);
  const properties = await fetchProperties(propList);
  const message =
    filter === 'past'
      ? "You haven't adventured yet."
      : 'You have no upcoming adventures.';
  const resWithPropeties = items.map((r) => ({
    ...r,
    property: properties.find((p) => p.cmsID === r.cmsID),
  }));
  return {
    items: resWithPropeties,
    count,
    message: count === 0 ? message : undefined,
  };
}
