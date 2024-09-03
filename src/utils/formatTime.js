import { DateTime } from 'luxon';

export const formatTimeDifference = (mongoDate) => {
  const now = DateTime.now();
  const createDate = DateTime.fromJSDate(mongoDate);

  const diff = now.diff(createDate, ['years', 'months', 'days', 'hours', 'minutes', 'seconds']).toObject();

  if (diff.years >= 1) {
    return diff.years === 1 ? '1 yr' : `${Math.floor(diff.years)} yrs`;
  } else if (diff.months >= 1) {
    return diff.months === 1 ? '1 month' : `${Math.floor(diff.months)} months`;
  } else if (diff.days >= 1) {
    return diff.days === 1 ? '1 day' : `${Math.floor(diff.days)} days`;
  } else if (diff.hours >= 1) {
    return diff.hours === 1 ? '1 hr' : `${Math.floor(diff.hours)} hrs`;
  } else if (diff.minutes >= 1) {
    return diff.minutes === 1 ? '1 min' : `${Math.floor(diff.minutes)} mins`;
  } else {
    return 'A moment ago';
  }
};
