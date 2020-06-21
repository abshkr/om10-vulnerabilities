import _ from 'lodash';

const getDateRangeOffset = (rangeSetting, maxRange) => {
  //return the days before and after today
  let value="";
  if (String(rangeSetting) === "" || !rangeSetting) {
    value = maxRange+"~~0";
  }
  else {
    value = String(rangeSetting);
  }
  console.log(rangeSetting, value);
  
  let ranges = value.split( "~~" );
  let beforeToday = String(_.toNumber(maxRange)-1);
  let afterToday = "1";
  
  if (ranges.length === 0) {
    beforeToday = "-1";
    afterToday = "-1";
  }
  else if (ranges.length === 1) {
    beforeToday = ranges[0];
    afterToday = "0";
  }
  else {
    beforeToday = ranges[0];
    afterToday = ranges[1];
  }
  
  if (beforeToday === "-1" && afterToday === "-1") {
    // suppose to empty the date range, but difficult to do at the moment, so set the day as maxRange
    beforeToday = String(_.toNumber(maxRange)-1);
    afterToday = "1";
  }
  else {
    if (beforeToday === "-1") {
      beforeToday = maxRange; //"0";
    }
    if (afterToday === "-1") {
      afterToday = "1"; //"0";
    }
    
    //field.defaultDays = Number( beforeToday );
    //field.getInitFilter( Number( afterToday ) );
  }
  console.log(ranges, beforeToday, afterToday);

  return {beforeToday: _.toNumber(beforeToday), afterToday: _.toNumber(afterToday)};
};
  
 export default getDateRangeOffset;
  