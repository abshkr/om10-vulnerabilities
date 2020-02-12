import moment from 'moment';
import { SETTINGS } from '../constants';

const convertToLocale = value => {
  if (value !== '') {
    const payload = moment(value, SETTINGS.DATE_TIME_FORMAT).format('DD/MM/YYYY hh:m:ss a');

    return payload;
  }
  return value;
};

export default convertToLocale;
