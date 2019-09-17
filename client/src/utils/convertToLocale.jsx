import moment from 'moment';

const convertToLocale = value => {
  if (value !== '') {
    const date = Intl.DateTimeFormat().format(moment(value, 'YYYY-MM-DD HH:mm:ss'));

    const time = Intl.DateTimeFormat('en', { timeStyle: 'medium' }).format(
      moment(value, 'YYYY-MM-DD HH:mm:ss')
    );

    const payload = `${date} ${time}`;

    return payload;
  } else {
    return value;
  }
};

export default convertToLocale;
