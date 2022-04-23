import { diffDays } from '../dates';
import {
  pMap,
  hasContents,
  parseParams,
  splitParamsBySource,
  filterCmsByID,
  filterDbByID,
  sortCMSByIDList,
  removeUndefined,
} from './params';
import clientPromise from '../mongodb';
import cmsClient from '../../Contentful';
import {
  getPriceDescriptors,
  createCombinedProperties,
} from '../../components/adapters/property/property';
import { SearchSchema } from '../../data/validation/search';

const DEFAULT_SEARCH_DAYS = 365;

function getCMSQuery(params) {
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

// stage one filters based on availability
// @param cmsIDs = array of CMS_IDs which are used to filter results (i.e. properties in a location)
// uses a global static variable for non-dated search range
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

// mongo group pipeline.
// displayPrice used average or first available
// availCount used in next stage to determine availability over entire date range.
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

// Further refines based on price filters and availability over entire date range (if applicable)
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

// Performs Mongo search
// @param params: list of search params
// @param cmsIDs: list of cmsIDs to filter search
// @param sort: {<sortKey>: 1 || -1, ...}
async function dbSearch(params, cmsIDs, sort) {
  // get filtered properties from db along with price;
  const dbClient = await clientPromise;

  const match1 = createStage1Match(params, cmsIDs);
  const group = createGroup(params);
  const match2 = createStage2Match(params);
  const _sort = hasContents(sort) ? { $sort: sort } : undefined;

  const pipelines = removeUndefined([match1, group, match2, _sort]);

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

  const pQuery = getCMSQuery(params);
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

function getPriceSort(sortBy, isLocationSearch) {
  if (isLocationSearch) {
    return sortBy;
  }
  // sort by price if not destination search
  return { displayPrice: -1 };
}

function getMessage(results, ignoredLocation) {
  if (!hasContents(results)) {
    return { message: 'No results found.' };
  }
  if (ignoredLocation) {
    return {
      message:
        'No results found in the destination provided. Here are some available listings in other locations.',
    };
  }
}

// @param params <object>: key pair object of search parameters
// @param sortBy <object>: key = price or destination, value = -1 (desc) || 1 (asc)
export async function search(params) {
  let dbResults = [];
  let cmsResults = [];
  let locationIDs = [];
  let geoFilter = '';

  const { sortBy, ...cleanParams } = parseParams(params);

  // validate data, return error
  try {
    await SearchSchema.validate(cleanParams);
  } catch (error) {
    return { error: error.message };
  }

  const { cmsParams, dbParams } = splitParamsBySource(cleanParams);
  const { destination, ...CMSParamsExclDest } = cmsParams || {};
  const isCmsSearch = hasContents(CMSParamsExclDest);
  const isDestSearch = cmsParams && cmsParams.destination && true;
  const priceSort = getPriceSort(sortBy, isDestSearch);
  let ignoredLocation = false;

  if (isDestSearch) {
    const geo = await geocode(cmsParams.destination);
    geoFilter = getGeoFilter(geo);
    // get property list for geolocation
    const locationResults = geoFilter
      ? await cmsSearch({ destination: geoFilter })
      : undefined;

    locationIDs = locationResults
      ? getCmsIDs({ cmsResults: locationResults })
      : [];
    ignoredLocation = !hasContents(locationIDs);
  }

  // search
  dbResults = postDBProcessing(
    await dbSearch(dbParams, locationIDs, priceSort)
  );

  if (hasContents(dbResults)) {
    // further refine search with cms filters
    cmsResults = await cmsSearch(CMSParamsExclDest, getCmsIDs({ dbResults }));
  }

  const sortedCMSResults =
    priceSort || !hasContents(locationIDs)
      ? cmsResults
      : sortCMSByIDList(cmsResults, locationIDs);

  let combinedResults = [];
  if (hasContents(dbResults) && hasContents(cmsResults)) {
    combinedResults = createCombinedProperties(
      filterCmsByID(sortedCMSResults, getCmsIDs({ dbResults })),
      isCmsSearch
        ? filterDbByID(dbResults, getCmsIDs({ cmsResults: sortedCMSResults }))
        : dbResults,
      priceSort ? 'db' : 'cms'
    );
  }
  return {
    results: combinedResults,
    ...getMessage(combinedResults, ignoredLocation),
  };
}
