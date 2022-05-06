import { diffDays } from '../dates';
import { pMap, hasContents, processParams, removeUndefined } from './params';
import clientPromise from '../mongodb';
import { SearchSchema } from '../../data/validation/search';

const DEFAULT_SEARCH_DAYS = 365;
const DEFAULT_LIMIT = 3;

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

function getMappedFilters(params) {
  const fieldKeys = params
    ? Object.keys(params).filter((key) => pMap[key])
    : [];

  return fieldKeys.map((key) => {
    if (!pMap[key]) return undefined;
    const { qKey } = pMap[key];
    const { op } = pMap[key];
    return op ? { [qKey]: { [op]: params[key] } } : { [qKey]: params[key] };
  });
}

// stage one filters based on availability
// @param cmsIDs = array of CMS_IDs which are used to filter results (i.e. properties in a location)
// uses a global static variable for non-dated search range
function createGeoNear(params) {
  const {
    arriveDate,
    departDate,
    // nearbyActivities,
    // availability,
    destination,
    minPrice,
    maxPrice,
    ...mappedParams
  } = params || {};

  function getQuery(flterAry) {
    if (!hasContents(flterAry)) {
      return {};
    }

    if (flterAry.length > 1) {
      return { query: { $and: flterAry } };
    }
    return { query: flterAry[0] };
  }

  const fieldFilters = mappedParams
    ? getMappedFilters(mappedParams)
    : undefined;
  const query = getQuery(fieldFilters);

  if (destination) {
    return {
      $geoNear: {
        ...query,
        near: { type: 'Point', coordinates: destination },
        distanceField: 'distance',
        maxDistance: 100 * 1609.344,
        // includeLocs: 'distance.location',
        distanceMultiplier: 0.000621371,
        spherical: true,
      },
    };
  }
}

// tests for availability
function createMatch1(params) {
  const {
    arriveDate,
    departDate,
    minPrice,
    maxPrice,
    destination,
    ...mappedParams
  } = params || {};
  const dt = new Date();
  const today = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate());
  const fieldFilters = !destination ? getMappedFilters(mappedParams) : [];
  function addDays(d, days) {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate() + days);
  }

  const startDate = arriveDate || today;
  const departFilter = departDate
    ? { $lt: departDate }
    : { $lt: addDays(startDate, 1) };

  // filter by availability on arrive date or constant number of days from today
  const filters = arriveDate
    ? removeUndefined([
        arriveDate && { 'availability.date': { $gte: arriveDate } },
        { 'availability.date': departFilter },
        { 'availability.booked': false },
        ...fieldFilters,
      ])
    : removeUndefined([
        { 'availability.date': { $gte: today } },
        { 'availability.date': { $lte: addDays(today, DEFAULT_SEARCH_DAYS) } },
        { 'availability.booked': false },
        ...fieldFilters,
      ]);
  return {
    $match: {
      $and: filters,
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
      displayPrice: { [fnPrice]: '$availability.price' },
      doc: { $first: '$$ROOT' },
      availCount: { $count: {} },
    },
  };
}

// Further refines based on price filters and availability over entire date range (if applicable)
function createStage3Match(params) {
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

function getMessage(results, ignoredLocation) {
  if (!hasContents(results)) {
    return {
      message:
        'No properties availabile matching the search provided. Try changing the search filters.',
    };
  }
  if (ignoredLocation) {
    return {
      message:
        'No results found in the destination provided. Here are some available listings in other locations.',
    };
  }
}
6;
// Performs Mongo search
// @param params: list of search params
// @param sortBy: {<sortKey>: 1 || -1, ...}
async function searchDB({ limit, skip, sortBy, ...searchParams }, blnCount) {
  let results;
  const priceSort =
    sortBy && sortBy.displayPrice !== undefined ? sortBy : undefined;
  const dbClient = await clientPromise;

  // all filters (excl price and availability) applied in geoNear
  const geoNear = searchParams.destination
    ? createGeoNear(searchParams)
    : undefined;
  // match1 filters availability for destination searches
  // if no destination match1 filters all (excl price)
  const match1 = createMatch1(searchParams);
  const group = createGroup(searchParams);
  const replaceRoot = {
    $replaceRoot: {
      newRoot: {
        $mergeObjects: [
          '$doc',
          { availCount: '$availCount' },
          { displayPrice: '$displayPrice' },
        ],
      },
    },
  };

  const match3 = createStage3Match(searchParams);
  const countStages = blnCount
    ? [{ $group: { _id: null, count: { $sum: 1 } } }, { $project: { _id: 0 } }]
    : [];
  const _sort =
    !blnCount && hasContents(priceSort)
      ? { $sort: priceSort }
      : { $sort: { distance: 1 } };

  const pipelines = removeUndefined([
    geoNear,
    { $unwind: '$availability' },
    match1,
    group,
    replaceRoot,
    match3,
    ...countStages,
    _sort,
  ]);

  if (!blnCount) {
    results = await dbClient
      .db()
      .collection('properties')
      .aggregate([...pipelines, { $unset: ['_id'] }])
      .skip(skip || 0)
      .limit(limit || DEFAULT_LIMIT)
      .toArray();
    return { items: results, query: pipelines };
  }
  results = await dbClient
    .db()
    .collection('properties')
    .aggregate([...pipelines, { $unset: ['_id'] }])
    .next();
  return results.count;
}

async function createSearchParams(params) {
  const {
    destination,
    page,
    numResults = DEFAULT_LIMIT,
    ...queryParams
  } = params;
  let pagination = {};
  if (page >= 0) {
    pagination = { limit: numResults, skip: (page - 1) * numResults };
  }
  if (destination) {
    const geo = await geocode(destination);
    return {
      ...queryParams,
      ...pagination,
      destination: [Number(geo.lon), Number(geo.lat)],
    };
  }
  return { ...queryParams, ...pagination };
}

// @param params <object>: key pair object of search parameters
// @param sortBy <object>: key = price or destination, value = -1 (desc) || 1 (asc)
export async function search(params) {
  let results = [];
  let count;
  const cleanParams = processParams(params);
  const { sortBy } = cleanParams;
  let sortByUsed = sortBy;
  let ignoredLocation = false;

  try {
    await SearchSchema.validate(cleanParams);
  } catch (error) {
    return { error: error.message };
  }

  const searchParams = await createSearchParams(cleanParams);
  if (hasContents(searchParams)) {
    results = await searchDB(searchParams);
    count = hasContents(results.items) ? await searchDB(searchParams, true) : 0;
    if (cleanParams.destination && !hasContents(results.items)) {
      sortByUsed =
        sortBy && sortBy.displayPrice !== undefined
          ? sortBy
          : { displayPrice: -1 };
      const { destination, ...paramsExclDestination } = searchParams;
      results = await searchDB({
        paramsExclDestination,
        sortBy: sortByUsed,
      });
      ignoredLocation = true;
      count = hasContents(results.items)
        ? await searchDB({ paramsExclDestination }, true)
        : 0;
    }
  } else {
    // ? return all properties?
  }

  return {
    results: { ...results, count },
    ...getMessage(results, ignoredLocation),
    ignoredLocation,
  };
}
