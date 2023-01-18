import _ from 'lodash';

const setupUserPageColumns = (origColumns, pageColumns) => {
  if (pageColumns?.length === 0) {
    // no settings from database = no adjustment ever done before
    // just use the original definition of columns
    return origColumns;
  } else {
    // found the settings, re-organize the sequence, width, or visibility of columns according to the settings in database
    const newColumns = [];
    _.forEach(pageColumns, (o) => {
      const item = _.find(origColumns, (v) => v?.field === o?.column_code);
      if (item) {
        item.width = o?.column_width;
        item.hide = !o?.column_visible;
        newColumns.push(item);
      }
    });
    // now attach the missing original columns to new array
    // the column missing in database could be either it is the new column added in source code or it is not in the initializing scripts
    _.forEach(origColumns, (o) => {
      const item = _.find(pageColumns, (v) => v?.column_code === o?.field);
      if (!item) {
        // make sure it is invisible
        // o.hide = true;
        newColumns.push(o);
      }
    });
    return newColumns;
  }
};

export default setupUserPageColumns;
