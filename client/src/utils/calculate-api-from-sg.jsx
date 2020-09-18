import _ from 'lodash';

// °API = (141.5 / SG) - 131.5   
const calcApiFromSg = (value) => {
  const SG = _.toNumber(value);

  if (_.isNaN(SG)) {
    return null;
  } else {
    if (_.toInteger(SG*1000000) === 0) {
      return null;
    } else {
      const API = (141.5 / SG) - 131.5;
      return API;
    }
  }
};
  
export default calcApiFromSg;
  