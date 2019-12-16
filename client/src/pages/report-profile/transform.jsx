import _ from 'lodash';

const transform = data => {
  const payload = _.map(data, object => {
    object['report_closeout_flag2_name'] = object.report_closeout_flag2
      ? 'Folio Range [Start/End Folio Number]'
      : 'Date Range [Start/End Date]';

    return object;
  });

  return payload;
};

export default transform;
