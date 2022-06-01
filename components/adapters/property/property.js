import clientPromise from '../../../utils/mongodb';
import { search } from '../../../utils/search/search';

export function withPropertyUrl(property) {
  return { ...property, url: `/properties/${property.cmsID}` };
}
export const getPriceDescriptors = () => ({ unit: 'night', currSymbol: '$' });

export const addDisplayPrice = (props) =>
  props.map((p) => {
    const { availability, ...remProps } = p;
    return {
      ...remProps,
      displayPrice: p.availability[0].price,
      ...getPriceDescriptors(),
    };
  });

export async function fetchProperty(id, includeAvailability) {
  const projAvail = !includeAvailability ? { availability: 0 } : {};
  const dbClient = await clientPromise;
  const property = await dbClient
    .db()
    .collection('properties')
    .findOne({ cmsID: id }, { projection: { _id: 0, ...projAvail } });
  return property;
}

export async function fetchProperties(propIDs) {
  const projectionObj = { _id: 0 };

  const dbClient = await clientPromise;
  const properties = await dbClient
    .db()
    .collection('properties')
    .find({ cmsID: { $in: propIDs } }, { projection: projectionObj })
    .toArray();
  return properties;
}

export async function fetchFeaturedProperties(topics, limit = 3) {
  let results;
  if (!topics) {
    results = await search({
      feature: true,
    });
    return results.results.items;
  }

  const promises = topics.map((topic) =>
    search({
      nearbyActivities: JSON.stringify([topic]),
      feature: true,
      limit,
    })
  );

  results = Promise.all([
    search({
      feature: true,
    }),
    ...promises,
  ]).catch((e) => console.log({ error: e }));
  return results;
}
