import cmsClient from '../../../Contentful';
import clientPromise from '../../../utils/mongodb';

const fetchCMSAttributes = async (ids) => {
  const property = await cmsClient.getEntry(ids);
  return property;
};

const fetchManyCMSAttributes = async (ids) => {
  const properties = await cmsClient.getEntries({
    content_type: 'property',
    'sys.id[in]': ids.toString(),
  });
  return properties;
};

const fetchDBAttributes = async (ids) => {
  const dbClient = await clientPromise;
  const property = await dbClient
    .db()
    .collection('properties')
    .findOne({ cmsID: ids }, { projection: { nearbyActivities: 1, _id: 0 } });
  return property;
};

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

  const transformProperties = (props) =>
    props.map((p) => {
      const { availability, ...remProps } = p;
      return {
        ...remProps,
        displayPrice: p.availability[0].price,
        unit: 'night',
        currSymbol: '$',
      };
    });

  // price used for feature listing
  const propertiesWithPrice = includeDisplayPrice
    ? transformProperties(properties)
    : properties;
  return propertiesWithPrice;
};

function createProperty(cmsProps, dbProps) {
  const { sys, fields } = cmsProps;
  return {
    cmsID: sys.id,
    ...fields,
    ...dbProps,
    url: `/properties/${sys.id}`,
  };
}

const createCombinedProperties = (cms, db) =>
  cms.items.map((cmsProp) => {
    const dbAttributes = db.find((dbProp) => dbProp.cmsID === cmsProp.sys.id);
    return createProperty(cmsProp, dbAttributes);
  });

export async function fetchProperty(id) {
  const cmsProps = await fetchCMSAttributes(id);
  const dbProps = await fetchDBAttributes(id);
  return createProperty(cmsProps, dbProps);
}

export async function fetchProperties(propIDs) {
  const cmsProps = await fetchManyCMSAttributes(propIDs);
  const dbProps = await fetchManyDBAttributes(propIDs);
  return createCombinedProperties(cmsProps, dbProps);
}

export async function fetchFeaturedProperties() {
  const cmsProps = await cmsClient.getEntries({
    content_type: 'property',
    'fields.feature': true,
  });

  const propIDs = cmsProps.items.map((p) => p.sys.id);

  const dbProps = await fetchManyDBAttributes(propIDs, true);
  return createCombinedProperties(cmsProps, dbProps);
}
