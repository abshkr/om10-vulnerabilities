import _ from 'lodash';
import moment from 'moment';
import { SETTINGS } from '../../constants';

const generator = (data, config) => {
  const payload = [];
  // console.log('config................', config, moment());

  _.forEach(data, (element) => {
    const date = moment(element.tkrq_due, SETTINGS.DATE_TIME_FORMAT);

    payload.push({
      ...element,
      date: date.format(config?.dateFormat||'YYYY-MM-DD'),
      time: date.format(config?.timeFormatHM||'HH:mm'),
      day_of_week: date.format('dddd'),
      tkrq_key: element.tkrq_due,
    });
  });

  return payload;
};

export default generator;
