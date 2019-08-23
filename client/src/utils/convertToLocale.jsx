import moment from "moment";

const convertToLocale = value => {
  if (value !== "") {
    const date = moment(value, "YYYY-MM-DD HH:mm:ss:SSSS").format(
      moment.localeData().longDateFormat("L")
    );
    const time = moment(value, "YYYY-MM-DD HH:mm:ss:SSSS").format(
      moment.localeData().longDateFormat("LTS")
    );
    const payload = `${date} ${time}`;
    return payload;
  } else {
    return value;
  }
};

export default convertToLocale;
