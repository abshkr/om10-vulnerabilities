import _ from 'lodash';

/*
    columns: list of fields in the object, and each field contains code and label
    currObject: the object having the current values
    initObject: the object having the original values
*/
const compareObjects = (columns, currObject, initObject) => {
  const changes = [];
  const len = 50;
  console.log('....................compareObjects', currObject, initObject);
  // return changes;

  for (let tidx = 0; tidx < columns?.length; tidx++) {
    const column = columns?.[tidx];
    const code = column?.code;
    const title = column?.label;
    let currValue = currObject?.[code];
    let initValue = initObject?.[code];
    // compare initial value and current value
    if (currValue === undefined || currValue === null) {
      currValue = '';
    }
    if (initValue === undefined || initValue === null) {
      initValue = '';
    }
    if (_.isArray(currValue)) {
      currValue = JSON.stringify(currValue);
    }
    if (_.isArray(initValue)) {
      initValue = JSON.stringify(initValue);
    }
    if (currValue !== initValue) {
      changes.push({
        field: code,
        title: title,
        oldtip: initValue,
        newtip: currValue,
        old: String(initValue)?.length <= len ? initValue : String(initValue)?.substring(0, len) + ' ...',
        new: String(currValue)?.length <= len ? currValue : String(currValue)?.substring(0, len) + ' ...',
      });
    }
  }

  return changes;
};

export default compareObjects;
