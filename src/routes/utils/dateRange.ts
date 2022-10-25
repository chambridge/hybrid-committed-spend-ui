import type { Query } from 'api/queries/query';
import {
  getContractedLastYear,
  getContractedYtd,
  getLastNineMonthsDate,
  getLastSixMonthsDate,
  getLastThreeMonthsDate,
} from 'utils/dates';

// The date range drop down has the options below (if today is Jan 18th…)
// eslint-disable-next-line no-shadow
export const enum DateRangeType {
  contractedYtd = 'contracted_ytd', // Current month (Jan 1 - Dec 31)
  contractedLastYear = 'contracted_last_year', // Previous and current month (Dec 1 - Jan 18)
  date = 'date', // TBD...
  lastNineMonths = 'last_nine_months', // Last 90 days
  lastSixMonths = 'last_six_months', // Last 60 days (Nov 18 - Jan 17)
  lastThreeMonths = 'last_three_months', // Last 30 days (Dec 18 - Jan 17)
}

export const getDateRange = (dateRangeType: string) => {
  let dateRange;

  switch (dateRangeType) {
    case DateRangeType.contractedLastYear:
      dateRange = getContractedLastYear();
      break;
    case DateRangeType.lastNineMonths:
      dateRange = getLastNineMonthsDate();
      break;
    case DateRangeType.lastSixMonths:
      dateRange = getLastSixMonthsDate();
      break;
    case DateRangeType.lastThreeMonths:
      dateRange = getLastThreeMonthsDate();
      break;
    case DateRangeType.contractedYtd:
    default:
      dateRange = getContractedYtd();
      break;
  }
  return dateRange;
};

export const getDateRangeDefault = (queryFromRoute: Query) => {
  return queryFromRoute.dateRange || DateRangeType.contractedYtd;
};
