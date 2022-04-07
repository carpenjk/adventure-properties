import clientPromise from '../mongodb';

export async function fetchActivities(q) {
  const client = await clientPromise;
  const activities = await client
    .db()
    .collection('properties')
    .aggregate([
      {
        $group: {
          _id: null,
          nearbyActivities: {
            $addToSet: '$nearbyActivities',
          },
        },
      },
      {
        $unwind: {
          path: '$nearbyActivities',
        },
      },
      {
        $project: {
          _id: 0,
          nearbyActivities: {
            $filter: {
              input: '$nearbyActivities',
              as: 'nearbyActivities',
              cond: {
                $regexMatch: {
                  input: '$$nearbyActivities',
                  regex: q,
                },
              },
            },
          },
        },
      },
    ])
    .toArray();
  return activities[0].nearbyActivities;
}
