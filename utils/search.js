import { dateReviver, diffDays } from './dates';
import clientPromise from './mongodb';
import cmsClient from '../Contentful';
import {
  getPriceDescriptors,
  createCombinedProperties,
} from '../components/adapters/property/property';

const pMap = {
  destination: { qKey: 'fields.location[within]', source: 'cms' },
  guests: { qKey: 'fields.guests[gte]', source: 'cms' },
  arriveDate: { source: 'db' },
  departDate: { source: 'db' },
  experience: { qKey: 'fields.experience[all]', source: 'cms' },
  nearbyActivities: { source: 'db' },
  propertyType: { qKey: 'fields.propertyType[all]', source: 'cms' },
  availability: { qKey: 'fields.availability[all]', source: 'cms' },
  access: { qKey: 'fields.access[all]', source: 'cms' },
  amenities: { qKey: 'fields.amenities[all]', source: 'cms' },
  minPrice: { source: 'db' },
  maxPrice: { source: 'db' },
  beds: { qKey: 'fields.beds[gte]', source: 'cms' },
  baths: { qKey: 'fields.baths[gte]', source: 'cms' },
};

const DEFAULT_SEARCH_DAYS = 365;

function hasContents(params) {
  return params && (params.length > 0 || Object.keys(params).length > 0);
}

function removeUndefined(ary) {
  return ary.filter((item) => item);
}

function drillPath(obj, path) {
  const keys = path.split('.');
  let cursor = obj;
  keys.forEach((key) => (cursor = cursor[key]));
  return cursor;
}

function filterAry(ary, items, path) {
  if (!ary || ary.length < 1) {
    return [];
  }
  return ary.filter((item) => items.includes(drillPath(item, path)));
}

function filterDbByID(ary, cmsList) {
  return filterAry(ary, cmsList, 'cmsID');
}
function filterCmsByID(ary, cmsList) {
  return filterAry(ary, cmsList, 'sys.id');
}

function cleanseParams(params) {
  const pNames = Object.keys(params);
  const cleansed = pNames.reduce((obj, p) => {
    if (params[p] === '') {
      return obj;
    }
    if (
      Array.isArray(params[p]) &&
      (params[p].length < 1 || params[p].every((val) => val === ''))
    ) {
      return obj;
    }
    return { ...obj, [p]: params[p] };
  }, {});
  return cleansed;
}

function parseParams(params) {
  const pNames = Object.keys(params);
  const parsed = pNames.reduce(
    (obj, p) => ({
      ...obj,
      [p]: params[p] === '' ? '' : JSON.parse(params[p], dateReviver),
    }),
    {}
  );

  return cleanseParams(parsed);
}

function splitParamsBySource(params) {
  let cmsParams;
  let dbParams;
  Object.keys(params).forEach((p) => {
    if (pMap[p].source === 'cms') {
      cmsParams = { ...cmsParams, [p]: params[p] };
    }
    if (pMap[p].source === 'db') {
      dbParams = { ...dbParams, [p]: params[p] };
    }
  });
  return { cmsParams, dbParams };
}

function getQuery(params) {
  const pNames = Object.keys(params);
  const pQuery = pNames.reduce((obj, p) => {
    const value = Array.isArray(params[p]) ? params[p].join(',') : params[p];
    return { ...obj, [pMap[p].qKey]: value };
  }, {});
  return pQuery;
}

function postDBProcessing(results) {
  // workaround for mongodb _id does not serialize in nextjs server side props
  const reparsed = JSON.parse(JSON.stringify(results));
  return reparsed.map((r) => ({
    ...r,
    ...getPriceDescriptors(),
  }));
}

function createStage1Match(params, cmsIDs) {
  const { arriveDate, departDate, nearbyActivities } = params || {};
  const dt = new Date();
  const today = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate());

  function addDays(d, days) {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate() + days);
  }

  const startDate = arriveDate || today;
  const departFilter = departDate
    ? { $lt: departDate }
    : { $lt: addDays(startDate, 1) };

  // filter by availability on arrive date or constant number of days from today
  const dateMatch = arriveDate
    ? removeUndefined([
        arriveDate && { 'availability.date': { $gte: arriveDate } },
        { 'availability.date': departFilter },
        { 'availability.booked': false },
      ])
    : [
        { 'availability.date': { $gte: today } },
        { 'availability.date': { $lte: addDays(today, DEFAULT_SEARCH_DAYS) } },
        { 'availability.booked': false },
      ];

  const aryActivities = Array.isArray(nearbyActivities)
    ? nearbyActivities
    : [nearbyActivities];
  const aryMatch = removeUndefined([
    hasContents(cmsIDs) && { cmsID: { $in: cmsIDs } },
    ...dateMatch,
    hasContents(nearbyActivities) && {
      nearbyActivities: { $in: aryActivities },
    },
  ]);

  return {
    $match: {
      $and: aryMatch,
    },
  };
}

function createGroup(params) {
  const { arriveDate, departDate } = params || {};
  const isRange = arriveDate && departDate && true;
  // if date range then get average price and avail count
  // if no date range then compare to min price
  const fnPrice = isRange ? '$avg' : '$min';

  return {
    $group: {
      _id: '$_id',
      cmsID: { $first: '$cmsID' },
      displayPrice: { [fnPrice]: '$availability.price' },
      nearbyActivities: { $first: '$nearbyActivities' },
      availCount: { $count: {} },
    },
  };
}

function createStage2Match(params) {
  const { arriveDate, departDate, minPrice, maxPrice } = params || {};

  if (!((arriveDate && departDate) || minPrice || maxPrice)) {
    return;
  }
  const filters = removeUndefined([
    minPrice && { displayPrice: { $gte: Number(minPrice) } },
    maxPrice && { displayPrice: { $lte: Number(maxPrice) } },
    arriveDate &&
      departDate && { availCount: diffDays(departDate, arriveDate) },
  ]);

  if (filters.length > 1) {
    return {
      $match: {
        $and: [...filters],
      },
    };
  }

  return {
    $match: filters[0],
  };
}

async function dbSearch(params, cmsIDs) {
  // get filtered properties from db along with price;
  const dbClient = await clientPromise;

  const match1 = createStage1Match(params, cmsIDs);
  const group = createGroup(params);
  const match2 = createStage2Match(params);

  const pipelines = removeUndefined([match1, group, match2]);

  const results = await dbClient
    .db()
    .collection('properties')
    .aggregate([
      { $unwind: '$availability' },
      ...pipelines,
      { $unset: ['_id'] },
    ])
    .toArray();

  return results;
}

async function geocode(q) {
  try {
    const data = await fetch(
      `https://us1.locationiq.com/v1/search.php?key=${process.env.LOCATIONIQ_API_ACCESS_TOKEN}&q=${q}&limit=1&format=json`
    );
    const geoAry = await data.json();
    return geoAry.length > 0 ? geoAry[0] : '';
  } catch (e) {
    console.log(e);
  }
}

async function cmsSearch(params, cmsIDs) {
  if (!hasContents(params) && !hasContents(cmsIDs)) {
    return undefined;
  }
  // search something
  let idFilter = {};
  if (hasContents(cmsIDs)) {
    const isMoreThanOneID = cmsIDs.length > 1;
    const pathOp = isMoreThanOneID ? 'sys.id[in]' : 'sys.id';
    const criteria = isMoreThanOneID ? cmsIDs.join(',') : cmsIDs[0];
    idFilter = { [pathOp]: criteria };
  }

  const pQuery = getQuery(params);
  const results = await cmsClient.getEntries({
    content_type: 'property',
    ...pQuery,
    ...idFilter,
  });
  return results.items;
}
function getCmsIDs({ cmsResults, dbResults }) {
  if (hasContents(cmsResults)) {
    return cmsResults.map((item) => item.sys.id);
  }
  if (hasContents(dbResults)) {
    return dbResults.map((item) => item.cmsID);
  }
  return [];
}

function getGeoFilter(geo) {
  return geo ? `${geo.lat},${geo.lon},100` : '';
}

export async function search(params) {
  let dbResults = [];
  let cmsResults = [];
  let geoFilter = '';

  const cleanParams = parseParams(params);
  const { cmsParams, dbParams } = splitParamsBySource(cleanParams);
  const { destination, ...CMSParamsExclDest } = cmsParams || {};
  const isCmsSearch = hasContents(CMSParamsExclDest);
  const isDestSearch = cmsParams && cmsParams.destination && true;
  let ignoredLocation = false;

  if (isDestSearch) {
    const geo = await geocode(cmsParams.destination);
    geoFilter = getGeoFilter(geo);
    // get property list for geolocation
    const locationResults = geoFilter
      ? await cmsSearch({ destination: geoFilter })
      : undefined;

    const locationIDs = locationResults
      ? getCmsIDs({ cmsResults: locationResults })
      : undefined;
    ignoredLocation = !hasContents(locationIDs);
    dbResults = postDBProcessing(await dbSearch(dbParams, locationIDs));
    if (hasContents(dbResults)) {
      cmsResults = await cmsSearch(CMSParamsExclDest, getCmsIDs({ dbResults }));
    }
  } else {
    dbResults = await dbSearch(dbParams);
    if (hasContents(dbResults)) {
      cmsResults = await cmsSearch(CMSParamsExclDest, getCmsIDs({ dbResults }));
    }
  }

  let combinedResults = [];
  if (hasContents(dbResults) && hasContents(cmsResults)) {
    combinedResults = createCombinedProperties(
      filterCmsByID(cmsResults, getCmsIDs({ dbResults })),
      isCmsSearch
        ? filterDbByID(dbResults, getCmsIDs({ cmsResults }))
        : dbResults
    );
  }

  let message = {};
  if (!hasContents(combinedResults)) {
    message = { message: 'No results found.' };
  } else if (ignoredLocation) {
    message = {
      message:
        'No results found in the destination provided. Here are some available listings in other locations.',
    };
  }

  return { results: combinedResults, ...message };
}
