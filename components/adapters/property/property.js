import cmsClient from '../../../Contentful';
import clientPromise from '../../../utils/mongodb';

const fetchCMSAttributes = async (id) => {
  const property = await cmsClient.getEntry(id);
  return property;
};

const fetchManyCMSAttributes = async (ids) => {
  const properties = await cmsClient.getEntries({
    content_type: 'property',
    'sys.id[in]': ids.toString(),
  });
  return properties;
};

const fetchDBAttributes = async (id) => {
  const dbClient = await clientPromise;
  const property = await dbClient
    .db()
    .collection('properties')
    .findOne({ cmsID: id }, { projection: { nearbyActivities: 1, _id: 0 } });
  return property;
};

export const getPriceDescriptors = () => ({ unit: 'night', currSymbol: '$' });

const addDisplayPrice = (props) =>
  props.map((p) => {
    const { availability, ...remProps } = p;
    return {
      ...remProps,
      displayPrice: p.availability[0].price,
      ...getPriceDescriptors(),
    };
  });

const fetchManyDBAttributes = async (ids, includeDisplayPrice) => {
  const baseProjection = { cmsID: 1, nearbyActivities: 1, _id: 0 };
  const projectionObj = includeDisplayPrice
    ? { ...baseProjection, availability: { $slice: 1 } }
    : baseProjection;
  const dbClient = await clientPromise;
  const properties = await dbClient
    .db()
    .collection('properties')
    .find({ cmsID: { $in: ids } }, { projection: projectionObj })
    .toArray();

  // price used for feature listing
  const propertiesWithPrice = includeDisplayPrice
    ? addDisplayPrice(properties)
    : properties;
  return propertiesWithPrice;
};

function createProperty(cmsProps, dbProps) {
  const { sys, fields } = cmsProps || {};
  const cmsID = sys ? sys.id : dbProps.cmsID;
  return {
    cmsID,
    ...fields,
    ...dbProps,
    url: `/properties/${cmsID}`,
  };
}

export const createCombinedProperties = (cms, db) => {
  const isCms = cms && cms.length > 0;
  const isDb = db && db.length > 0;
  if (!isCms && !isDb) {
    return undefined;
  }
  if (isCms) {
    return cms.map((cmsProp) => {
      const dbProps = db.find((dbProp) => dbProp.cmsID === cmsProp.sys.id);
      return createProperty(cmsProp, dbProps);
    });
  }
  // no cms results
  return db.map((dbProps) => createProperty(undefined, dbProps));
};

export async function fetchProperty(id) {
  const cmsProps = await fetchCMSAttributes(id);
  const dbProps = await fetchDBAttributes(id);
  return createProperty(cmsProps, dbProps);
}

export async function fetchProperties(propIDs) {
  const cmsProps = await fetchManyCMSAttributes(propIDs);
  const dbProps = await fetchManyDBAttributes(propIDs);
  return createCombinedProperties(cmsProps.items, dbProps);
}

export async function fetchFeaturedProperties() {
  const cmsProps = await cmsClient.getEntries({
    content_type: 'property',
    'fields.feature': true,
  });

  const propIDs = cmsProps.items.map((p) => p.sys.id);

  const dbProps = await fetchManyDBAttributes(propIDs, true);
  return createCombinedProperties(cmsProps.items, dbProps);
}
