const unitConverter = (value, unit) => {
  value = parseInt(value);

  if (unit === 'Litres') {
    return isNaN(value) ? '0' : value.toFixed(2);
  }

  if (unit === 'Cubic Metre') {
    const result = String((value / 1000).toFixed(2));
    return isNaN(result) ? '0' : result;
  }

  if (unit === 'Imperial Gallon') {
    const result = String((value / 4.546).toFixed(2));
    return isNaN(result) ? '0' : result;
  }

  if (unit === 'U.S Gallon') {
    const result = String((value / 3.785).toFixed(2));
    return isNaN(result) ? '0' : result;
  }

  if (unit === 'Imperial Barrel') {
    const result = String((value / 0.0061).toFixed(2));
    return isNaN(result) ? '0' : result;
  }

  if (unit === 'U.S Barrel') {
    const result = String((value / 158.987).toFixed(2));
    return isNaN(result) ? '0' : result;
  }
};

export default unitConverter;
