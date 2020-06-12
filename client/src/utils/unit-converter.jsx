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
    const result = _.round(value * 0.2199692, 2);
    return isNaN(result) ? 0 : result;
  }

  if (unit === 'U.S Gallon') {
    const result = _.round(value * 0.2641721, 2);
    return isNaN(result) ? 0 : result;
  }

  if (unit === 'Imperial Barrel') {
    const result = _.round(value * 0.005237363, 2);
    return isNaN(result) ? 0 : result;
  }

  if (unit === 'U.S Barrel') {
    const result = _.round(value * 0.006289811, 2);
    return isNaN(result) ? 0 : result;
  }
};

const massConverter = (value, unit) => {
  value = parseInt(value);

  if (unit === 'KG') {
    return isNaN(value) ? 0 : _.round(value, 2);
  }

  if (unit === 'Pound') {
    const result = _.round(value * 2.204623, 2);
    return isNaN(result) ? 0 : result;
  }

  if (unit === 'Imperial Ton') {
    const result = _.round(value * 0.0010160469, 2);
    return isNaN(result) ? 0 : result;
  }

  if (unit === 'Ton') {
    const result = _.round(value * 0.001, 2);
    return isNaN(result) ? 0 : result;
  }
}

export { unitConverter, massConverter };
