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

const fetchManyDBAttributes = async (ids) => {
  const dbClient = await clientPromise;
  const properties = await dbClient
    .db()
    .collection('properties')
    .find(
      { cmsID: { $in: ids } },
      { projection: { cmsID: 1, nearbyActivities: 1, _id: 0 } }
    )
    .toArray();
  return properties;
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

export async function fetchProperty(id) {
  const cmsProps = await fetchCMSAttributes(id);
  const dbProps = await fetchDBAttributes(id);
  return createProperty(cmsProps, dbProps);
}

export async function fetchProperties(propIDs) {
  const cmsProps = await fetchManyCMSAttributes(propIDs);
  const dbProps = await fetchManyDBAttributes(propIDs);

  const combinedProperties = cmsProps.items.map((cmsProp) => {
    const dbAttributes = dbProps.find(
      (dbProp) => dbProp.cmsID === cmsProp.sys.id
    );
    return createProperty(cmsProp, dbAttributes);
  });
  return combinedProperties;
}
