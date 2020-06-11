import _ from 'lodash';

const parser = (value) => {
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
      record[column.headerName] = parser(element[column.field]);
    });

    collection.push(record);
  });

  return collection;
};

export default transform;
