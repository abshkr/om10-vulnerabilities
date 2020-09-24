import _ from 'lodash';

const transform = (data, t) => {
  const payload = _.map(data, object => {
    object['report_closeout_flag2_name'] = object.report_closeout_flag2
      ? t('fields.reportCloseoutByFoliorange') // 'Folio Range [Start/End Folio Number]'
      : t('fields.reportCloseoutByDaterange'); // 'Date Range [Start/End Date]';

    return object;
  });

  return payload;
};

export default transform;
