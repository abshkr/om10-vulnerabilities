import _ from 'lodash';
import moment from 'moment';
import { SETTINGS } from '../../constants';

const generator = (data) => {
  const payload = [];

  _.forEach(data, (element) => {
    const date = moment(element.tkrq_due, SETTINGS.DATE_TIME_FORMAT);

    payload.push({
      ...element,
      time: date.format('HH:mm'),
      day_of_week: date.format('dddd'),
    });
  });

  return payload;
};

export default generator;
