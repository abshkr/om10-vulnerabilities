import _ from 'lodash';

const transform = (data, units) => {
  const payload = [];
  const defUnitCode = '5';
  const unit = _.find(units?.records, (o)=>(o.unit_id === defUnitCode));
  const defUnitName = !unit ? 'l (amb)' : unit?.description;
  // console.log('.............transform', units, unit, defUnitName);

  if (data) {
    _.forEach(data, (element) => {
      const record = {
        prod_code: element?.prod_code,
        prod_name: element?.prod_name,
        prod_image: element?.prod_image,
        qty_scheduled: element?.qty_scheduled > 0 ? element?.qty_scheduled : '',
        unit_name: !element?.unit_name ? defUnitName : element?.unit_name,
        unit_code: !element?.unit_code ? defUnitCode : element?.unit_code,
      };

      payload.push(record);
    });
  }

  return payload;
};

export default transform;
