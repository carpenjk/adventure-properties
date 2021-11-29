import cmsClient from '../../../Contentful';
import clientPromise from '../../../utils/mongodb';

const fetchCMSProps = async (id) => {
  const property = await cmsClient.getEntry(id);
  return property;
};

const fetchDBProps = async (id) => {
  const dbClient = await clientPromise;
  const dbProperties = await dbClient
    .db()
    .collection('properties')
    .findOne({ cmsID: id });
  return JSON.parse(JSON.stringify(dbProperties));
};

export async function fetchProperty(id) {
  // const property = await cmsClient.getEntry(id);
  // return property;
  const cmsProps = await fetchCMSProps(id);
  const dbProps = await fetchDBProps(id);

  return {
    props: {
      propertyData: {
        id,
        ...cmsProps,
        dbData: dbProps,
      },
    },
  };
}
