import _ from 'lodash';

// value: a string needs be converted to number
// backup: a number used when value is not available
const secureNumber = (value, backup) => {
  // console.log('................secure number', value, backup);
  // please note: the formatter function in useConfig.jsx has converted "undefined/null/''" to false
  if (value === undefined || value === null || String(value)?.trim() === '' || value === false) {
    // no value defined, use backup
    return backup;
  } else {
    // value defined, check if it is a number, use backup if not
    const number = _.toNumber(value);
    const invalid = _.isNaN(number);
    return invalid ? backup : number;
  }
};

export default secureNumber;
