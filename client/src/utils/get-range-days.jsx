import _ from 'lodash';

const getRangeDays = (rangeSetting, maxRange) => {
  //return the days before and after today
  let value = '';
  if (String(rangeSetting) === '' || String(rangeSetting) === '0' || !rangeSetting) {
    value = '-1~~-1';
  } else {
    value = String(rangeSetting);
  }
  console.log(rangeSetting, value);

  let ranges = value.split('~~');
  let beforeToday = String(_.toNumber(maxRange) - 1);
  let afterToday = '1';

  if (ranges.length === 0) {
    beforeToday = '-1';
    afterToday = '-1';
  } else if (ranges.length === 1) {
    beforeToday = ranges[0];
    afterToday = '-1';
  } else {
    beforeToday = ranges[0];
    afterToday = ranges[1];
  }
  console.log(ranges, beforeToday, afterToday);

  return { beforeToday: _.toNumber(beforeToday), afterToday: _.toNumber(afterToday) };
};

export default getRangeDays;
