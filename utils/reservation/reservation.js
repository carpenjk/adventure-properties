import { compareDateOnly } from '@carpenjk/date-utils';

// * Price functions ************************************************
export function getDailyPrices(availability, arriveDateVal, departDateVal) {
  // no user input to lookup
  if (!availability || !arriveDateVal || !departDateVal) {
    return undefined;
  }
  const dates = availability.avail.filter(
    (dt) => dt.date >= arriveDateVal && dt.date < departDateVal
  );
  return dates;
}

export function calcTotalPrice(availability, arriveDateVal, departDateVal) {
  const dailyPrices = getDailyPrices(
    availability,
    arriveDateVal,
    departDateVal
  );

  if (!dailyPrices || dailyPrices.length === 0) {
    return undefined;
  }
  return dailyPrices.reduce((sum, currDate) => currDate.price + sum, 0);
}

export function getAvgDailyPrice(availability, arriveDateVal, departDateVal) {
  const dailyPrices = getDailyPrices(
    availability,
    arriveDateVal,
    departDateVal
  );
  if (!dailyPrices || dailyPrices.length === 0) {
    return 0;
  }
  const total = calcTotalPrice() || 0;
  return total / dailyPrices.length;
}

export function getTodayPrice(availability) {
  if (!availability) {
    return 0;
  }
  return availability.avail.find((a) => compareDateOnly(a.date, new Date()))
    .price;
}

// * Unit functions *****************************************
export function calcUnitAmount(availability, arriveDateVal, departDateVal) {
  const dailyPrices = getDailyPrices(
    availability,
    arriveDateVal,
    departDateVal
  );
  return !dailyPrices ? 0 : dailyPrices.length;
}

export function getUnit(availability, arriveDateVal, departDateVal) {
  if (calcUnitAmount(availability, arriveDateVal, departDateVal) === 1) {
    return 'night';
  }
  return 'nights';
}

export function getDescription(availability, arriveDateVal, departDateVal) {
  return `${getAvgDailyPrice(
    availability,
    arriveDateVal,
    departDateVal
  )} x ${calcUnitAmount(availability, arriveDateVal, departDateVal)}${getUnit(
    availability,
    arriveDateVal,
    departDateVal
  )}`;
}
