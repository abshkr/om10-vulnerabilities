import _ from 'lodash';
import compareObjects from './compare-objects';

/*
    columns: list of fields in the object of arrays, and each field 
    field: the definition of the array field, contains code and label
    currArray: current values of an array
    initArray: original values of an array
*/
const compareArrays = (field, columns, currArray, initArray) => {
  let currValues = '';
  let initValues = '';
  const len = 50;
  console.log('....................compareArrays', currArray, initArray);
  // return changes;

  for (let tidx = 0; tidx < currArray?.length; tidx++) {
    const currObject = currArray?.[tidx];
    const initObject = initArray?.[tidx];
    const lineChanges = compareObjects(columns, currObject, initObject);
    console.log('....................compareArrays line', tidx, lineChanges);

    if (lineChanges?.length > 0) {
      if (initValues.length > 0) {
        initValues += '; ';
      }
      if (currValues.length > 0) {
        currValues += '; ';
      }

      let initStr = '';
      let currStr = '';
      for (let i = 0; i < lineChanges?.length; i++) {
        if (initStr.length > 0) {
          initStr += ', ';
        }
        if (currStr.length > 0) {
          currStr += ', ';
        }
        const change = lineChanges?.[i];
        initStr += change?.title + ': ' + (change?.oldtip || 'NULL');
        currStr += change?.title + ': ' + (change?.newtip || 'NULL');
      }
      initValues += String(tidx + 1) + ' - ' + initStr;
      currValues += String(tidx + 1) + ' - ' + currStr;
    }
  }

  let changes = null;
  if (initValues?.length > 0 || currValues?.length > 0) {
    changes = {
      field: field?.code,
      title: field?.label,
      oldtip: initValues,
      newtip: currValues,
      old: String(initValues)?.length <= len ? initValues : String(initValues)?.substring(0, len) + ' ...',
      new: String(currValues)?.length <= len ? currValues : String(currValues)?.substring(0, len) + ' ...',
    };
  }

  return changes;
};

export default compareArrays;
