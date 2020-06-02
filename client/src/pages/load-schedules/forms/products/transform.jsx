import _ from 'lodash';

const transform = (data) => {
  const payload = [];

  if (data) {
    _.forEach(data, (element) => {
      const record = {
        prod_code: element.prod_code,
        prod_name: element.prod_name,
        qty_scheduled: '',
        unit_name: 'l (amb)',
        unit_code: '5',
      };

      payload.push(record);
    });
  }

  return payload;
};

export default transform;
