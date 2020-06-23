import _ from 'lodash';

const parser = (column, value) => {
  if (column.cellRenderer === "ExpiryDateRenderer") {
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
      record[column.headerName] = parser(column, element[column.field]);
    });

    collection.push(record);
  });

  return collection;
};

export default transform;
