import _ from 'lodash';

const transform = (data) => {
  const payload = [];

  if (data) {
    _.forEach(data, (element) => {
      const record = {
        prod_code: element.prod_code,
        prod_name: element.prod_name,
        prod_image: element?.prod_image,
        qty_scheduled: element.qty_scheduled > 0 ? element.qty_scheduled : '',
        unit_name: 'l (amb)',
        unit_code: '5',
      };

      payload.push(record);
    });
  }

  return payload;
};

export default transform;
