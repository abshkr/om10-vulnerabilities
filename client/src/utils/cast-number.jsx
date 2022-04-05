import _ from 'lodash';

const castNumber = (value) => {
  if (value === undefined || value === null || String(value)?.trim() === '') {
    return null;
  } else {
    return _.toNumber(value);
  }
};

export default castNumber;
