import _ from 'lodash';
import { unitConverter } from '../../utils';

const transform = (data, tanks, unit) => {
  const payload = [];

  _.forEach(data, (object) => {
    // need to adjust the usablevol by summarize the puumpable vlume of the tanks having same base product
    /* The structure of the tank inventory
      {
          "tank_site": "CNS",
          "tank_sitename": "CNS - Shell CNS",
          "tank_code": "A0430D",
          "tank_location": "CNS",
          "base_code": "220000430",
          "base_name": "Lubricity R655 Drum",
          "tank_water_lvl": 0,
          "tank_water": 0,
          "tank_prod_lvl": 0,
          "tank_ifc": 0,
          "tank_temp": 30,
          "tank_total_vol": "3040",
          "tank_ullage": "-3040",
          "tank_amb_vol": "3040",
          "tank_ul_level": "",
          "netvol": 3040,
          "grossvol": 3040,
          "pumpablevol": 0,
          "usablevol": 3040,
          "bookbalance": 3040
      }    
    */
    // get all the tanks have the base code in object
    const items = _.filter(tanks, (o) => o?.base_code === object?.base_code);
    // sum the pumpable volume
    const pumpable = _.sumBy(items, 'pumpablevol');

    const entry = {
      ...object,
      bookbalance: unitConverter(object.bookbalance, unit),
      grossvol: unitConverter(object.grossvol, unit),
      netvol: unitConverter(object.netvol, unit),
      ullage: unitConverter(object.ullage, unit),
      usablevol: unitConverter(pumpable, unit),
      usablevol2: unitConverter(object.usablevol, unit),
    };

    payload.push(entry);
  });

  return payload;
};

export default transform;
