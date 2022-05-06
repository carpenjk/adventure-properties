import { dateReviver } from '../dates';

export const pMap = {
  destination: { qKey: 'location', source: 'db' },
  guests: { qKey: 'guests', op: '$gte', source: 'db', fnParse: Number },
  arriveDate: { source: 'db', fnParse: dateReviver },
  departDate: { source: 'db', fnParse: dateReviver },
  experience: { qKey: 'experience', op: '$all', source: 'db' },
  nearbyActivities: { qKey: 'nearbyActivities', op: '$all', source: 'db' },
  propertyType: { qKey: 'propertyType', op: '$all', source: 'db' },
  availability: { qKey: 'availability', op: '$all', source: 'db' },
  access: { qKey: 'access', op: '$all', source: 'db' },
  amenities: { qKey: 'amenities', op: '$all', source: 'db' },
  minPrice: { source: 'db' },
  maxPrice: { source: 'db' },
  beds: { qKey: 'beds', op: '$gte', source: 'db' },
  baths: { qKey: 'baths', op: '$gte', source: 'db' },
  feature: { qKey: 'feature' },
  cmsID: { qKey: 'cmsID' },
  page: { test: 'test' },
  sortBy: '',
};

export function hasContents(params) {
  return params && (params.length > 0 || Object.keys(params).length > 0);
}

export function removeUndefined(ary) {
  return ary.filter((item) => item);
}

export function drillPath(obj, path) {
  const keys = path.split('.');
  let cursor = obj;
  keys.forEach((key) => (cursor = cursor[key]));
  return cursor;
}

export function filterAry(ary, items, path) {
  if (!ary || ary.length < 1) {
    return [];
  }
  return ary.filter((item) => items.includes(drillPath(item, path)));
}
export function filterDbByID(ary, cmsList) {
  return filterAry(ary, cmsList, 'cmsID');
}
export function filterCmsByID(ary, cmsList) {
  return filterAry(ary, cmsList, 'sys.id');
}
export function sortCMSByIDList(cms, ids) {
  return removeUndefined(
    ids.map((id) => cms.find((item) => item.sys.id === id))
  );
}

// split params into 2 separate objects based on source
export function splitParamsBySource(params) {
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

// removes keys with empty values
export function cleanseParams(params) {
  const pNames = Object.keys(params);
  const cleansed = pNames.reduce((obj, p) => {
    // drop invalid param
    if (params[p] === '' || pMap[p] === undefined) return obj;
    // valid unmapped param
    if (pMap[p].qKey === undefined) return { ...obj, [p]: params[p] };
    // drop empty array searches?
    // if (
    //   Array.isArray(params[p]) &&
    //   (params[p].length < 1 || params[p].every((val) => val === ''))
    // ) {
    //   return obj;
    // }
    // add param with query mapping to valid params
    return { ...obj, [p]: params[p] };
  }, {});
  return cleansed;
}

// parse and revive date params
export function processParams(params) {
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
