const moment = require('moment');

const timeRemaining = (checkOutDate) => {
  const now = moment();
  const end = moment(checkOutDate);
  const duration = moment.duration(end.diff(now));
  return `${duration.days()} days ${duration.hours()} hours remaining`;
};

module.exports = timeRemaining;
