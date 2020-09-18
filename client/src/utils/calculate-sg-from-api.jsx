import _ from 'lodash';

// SG = 141.5 / (API + 131.5)   
const calcSgFromApi = (value) => {
  const API = _.toNumber(value);

  if (_.isNaN(API)) {
    return null;
  } else {
    const SG = 141.5 / (API + 131.5);
    return SG;
  }
};
  
export default calcSgFromApi;
  