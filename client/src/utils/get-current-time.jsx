import moment from 'moment';
 
import getServerTime from './get-server-time';
import { SETTINGS } from '../constants';

const getCurrentTime = async (type='SESSION') => {
  const localTime = moment().format(SETTINGS.DATE_TIME_FORMAT);
  let currTime = undefined;
  if (type === 'SERVER') {
    const sysDate = await getServerTime();
    if (sysDate) {
      currTime = sysDate?.date;
    } else {
      currTime = localTime;
    }
  } else if (type === 'SESSION') {
    const sessTime = sessionStorage.getItem('serverDateTime');
    if (sessTime) {
        currTime = sessTime;
      } else {
        currTime = localTime;
      }
    } else { 
    // type === 'LOCAL'
    currTime = localTime;
  }

  return currTime;
};

export default getCurrentTime;
