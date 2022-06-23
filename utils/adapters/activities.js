import clientPromise from '../mongodb';

export async function fetchActivities(q) {
  console.log('🚀 ~ file: activities.js ~ line 4 ~ fetchActivities ~ q', q);
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
        $project: {
          nearbyActivities: {
            $reduce: {
              input: '$nearbyActivities',
              initialValue: [],
              in: { $setUnion: ['$$this', '$$value'] },
            },
          },
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
                  regex: new RegExp(q, 'i'),
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
