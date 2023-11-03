import _ from 'lodash';

const csvToJSON = (csv, columnsIncluded = [], headersIncluded = []) => {
  const result = [];
  let headers = headersIncluded;
  let columns = columnsIncluded;

  const lines = csv.split('\n');
  if (headers.length === 0) {
    // use first line as headers
    headers = lines[0].split(',');
  }
  if (columns.length === 0) {
    // convert all columns
    const clnLen = lines[0].split(',').length;
    for (let k = 0; k < clnLen; k++) {
      columns.push(k);
    }
  }

  for (let i = 0; i < lines.length; i++) {
    if (_.trim(lines[i]).length === 0) {
      continue;
    }
    const obj = {};
    const currentline = lines[i].split(',');
    /* if (i===0 ) {
      console.log('_.isNumber(_.toNumber(currentline?.[0]))', currentline?.[0], _.toInteger(currentline?.[0]), _.toNumber(currentline?.[0]), _.isNumber(_.toNumber(currentline?.[0])));
    } */
    if (i === 0 && _.isNaN(_.toNumber(currentline?.[0])) === true) {
      continue;
    }
    for (let j = 0; j < columns.length; j++) {
      // console.log('csvToJson............', i, j, currentline, currentline[columns[j]]);
      // obj[headers[columns[j]]] = _.trim(_.trim(currentline[columns[j]], '"'));
      let trimed = _.trim(currentline[columns[j]]); // white spaces outside quotations
      trimed = _.trim(trimed, '"'); // quotations
      obj[headers[columns[j]]] = _.trim(trimed); // white spaces inside quotations
    }
    result.push(obj);
  }
  // console.log('csvToJSON', result);
  return result;
};

export default csvToJSON;
