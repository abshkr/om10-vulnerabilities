import _ from 'lodash';
import compareArrays from './compare-arrays';

/*
    columns: list of form fields contains code and label
    fields: current values in all form fields
    values: original values in all form fields
    mode: true - create, false - update
*/
const checkFormFields = (columns, fields, values, arrayColumns, mode = false) => {
  const changes = [];
  const len = 50;
  console.log('....................checkFormFields', fields, values);
  // return changes;

  for (let tidx = 0; tidx < columns?.length; tidx++) {
    const column = columns?.[tidx];
    const code = column?.code;
    const title = column?.label;
    let fieldValue = fields?.[code];
    let initValue = values?.[code];
    if (mode === false) {
      // compare initial value and current value
      if (fieldValue === undefined || fieldValue === null) {
        fieldValue = '';
      }
      if (initValue === undefined || initValue === null) {
        initValue = '';
      }
      if (_.isArray(fieldValue)) {
        // fieldValue = JSON.stringify(fieldValue);
        const change = compareArrays(column, arrayColumns[column?.code], fieldValue, initValue);
        if (change !== null) {
          changes.push(change);
        }
        continue;
      }
      if (_.isArray(initValue)) {
        // initValue = JSON.stringify(initValue);
      }
      if (fieldValue !== initValue) {
        changes.push({
          field: code,
          title: title,
          oldtip: initValue,
          newtip: fieldValue,
          old: String(initValue)?.length <= len ? initValue : String(initValue)?.substring(0, len) + ' ...',
          new:
            String(fieldValue)?.length <= len ? fieldValue : String(fieldValue)?.substring(0, len) + ' ...',
        });
      }
    } else {
      // check if current value is neither "undefined" nor "null"
      if (fieldValue === undefined || fieldValue === null) {
        fieldValue = '';
      }
      if (_.isArray(fieldValue)) {
        // fieldValue = JSON.stringify(fieldValue);
        const change = compareArrays(column, arrayColumns[column?.code], fieldValue, initValue);
        if (change !== null) {
          changes.push(change);
        }
        continue;
      }
      if (fieldValue !== undefined && fieldValue !== null && fieldValue !== '') {
        changes.push({
          field: code,
          title: title,
          oldtip: '',
          newtip: fieldValue,
          old: '',
          new:
            String(fieldValue)?.length <= len ? fieldValue : String(fieldValue)?.substring(0, len) + ' ...',
        });
      }
    }
  }

  return changes;
};

export default checkFormFields;
