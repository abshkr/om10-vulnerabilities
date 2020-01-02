import moment from 'moment';
import { SETTINGS } from '../constants';

const convertToLocale = value => {
  if (value !== '') {
    const date = Intl.DateTimeFormat().format(moment(value, SETTINGS.DATE_TIME_FORMAT));

    const time = Intl.DateTimeFormat('en', { timeStyle: 'medium' }).format(
      moment(value, SETTINGS.DATE_TIME_FORMAT)
    );

    const payload = `${date} ${time}`;

    return payload;
  }
  return value;
};

export default convertToLocale;
