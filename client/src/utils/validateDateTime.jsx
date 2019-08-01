import moment from "moment";

const validateDateTime = date => {
  const value = moment(date, "YYYY-MM-DD HH:mm:ss:SSSS").valueOf();
  return isNaN(value) ? 0 : value;
};

export default validateDateTime;
