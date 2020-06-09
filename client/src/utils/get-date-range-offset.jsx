import _ from 'lodash';

const getDateRangeOffset = (rangeSetting, maxRange) => {
  //return the days before and after today
  let value="";
  if (rangeSetting === "") {
    value = "1~~0";
  }
  else {
    value = rangeSetting;
  }
  
  let ranges = value.split( "~~" );
  let beforeToday = maxRange;
  let afterToday = maxRange;
  
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
    beforeToday = maxRange;
    afterToday = maxRange;
  }
  else {
    if (beforeToday === "-1") {
      beforeToday = maxRange; //"0";
    }
    if (afterToday === "-1") {
      afterToday = maxRange; //"0";
    }
    
    //field.defaultDays = Number( beforeToday );
    //field.getInitFilter( Number( afterToday ) );
  }

  return {beforeToday: _.toNumber(beforeToday), afterToday: _.toNumber(afterToday)};
};
  
 export default getDateRangeOffset;
  