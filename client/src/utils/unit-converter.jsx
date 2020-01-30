import _ from 'lodash';

const unitConverter = (value, unit) => {
  value = parseInt(value);

  if (unit === 'Litres') {
    return isNaN(value) ? 0 : _.round(value, 2);
  }

  if (unit === 'Cubic Metre') {
    const result = _.round(value / 1000, 2);
    return isNaN(result) ? 0 : result;
  }

  if (unit === 'Imperial Gallon') {
    const result = _.round(value / 4.546, 2);
    return isNaN(result) ? 0 : result;
  }

  if (unit === 'U.S Gallon') {
    const result = _.round(value / 3.785, 2);
    return isNaN(result) ? 0 : result;
  }

  if (unit === 'Imperial Barrel') {
    const result = _.round(value / 0.0061, 2);
    return isNaN(result) ? 0 : result;
  }

  if (unit === 'U.S Barrel') {
    const result = _.round(value / 158.987, 2);
    return isNaN(result) ? 0 : result;
  }
};

export default unitConverter;
