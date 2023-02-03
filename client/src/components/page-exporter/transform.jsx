import _ from 'lodash';

const parser = (column, value) => {
  if (column.cellRenderer === 'ExpiryDateRenderer') {
    if (!!value && value?.length > 0) {
      const target = _.find(value, (item) => {
        return item.edt_type_desc === column.headerName;
      });
      return target?.ed_exp_date;
    }
  }

  switch (value) {
    case true:
      return 'true';
    case false:
      return 'false';

    default:
      return value;
  }
};

const transform = (data, columns) => {
  const collection = [];

  _.forEach(data, (element) => {
    const record = {};

    _.forEach(columns, (column) => {
      if (!column.hide) {
        if (column.cellRenderer === 'ExpiryDateRenderer') {
          // When the column uses ExpiryDateRenderer,
          // previously it displayed the customized expiry date from an array [expiry_dates], and the column field was always "expiry_dates".
          // Now the column field has been changed to "expiry_datesN_XXXX" (N=1,2,3...; XXXX=eqpt/tnkr/psnl) to serve the feature of customisable columns,
          // but the value should be still from the array [expiry_dates]
          record[column.headerName] = parser(column, element['expiry_dates']);
        } else {
          record[column.headerName] = parser(column, element[column.field]);
        }
      }
    });

    collection.push(record);
  });

  return collection;
};

export default transform;
