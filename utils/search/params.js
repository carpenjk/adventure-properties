import { dateReviver } from '../dates';

export const pMap = {
  destination: { qKey: 'fields.location[near]', source: 'cms' },
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

// parse and revive date params
export function parseParams(params) {
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
