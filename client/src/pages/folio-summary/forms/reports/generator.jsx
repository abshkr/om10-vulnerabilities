import _ from 'lodash';
import { FOLIO_SUMMARY } from '../../../../api';

const generator = (id, data) => {
  const payload = [];

  _.forEach(data, object => {
    payload.push({
      report: object,
      link: `${FOLIO_SUMMARY.OPEN_REPORT}?report=${id}/${object}`
    });
  });

  return payload;
};

export default generator;
