import _ from 'lodash';

const getRealColor = (value) => {
  if (!value || value === '') {
    return '#ffffff';
  } else {
    let newValue = _.trimStart(value, '#');
    newValue = _.padStart(newValue, 6, '0');
    newValue = '#' + newValue;

    return newValue;
  }
};

export default getRealColor;
  