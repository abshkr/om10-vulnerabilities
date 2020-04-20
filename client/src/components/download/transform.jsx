import _ from 'lodash';

const transform = (data, columns) => {
  const collection = [];

  _.forEach(data, (element) => {
    const record = {};

    _.forEach(columns, (column) => {
      record[column.headerName] = element[column.field];
    });

    collection.push(record);
  });

  return collection;
};

export default transform;
