import _ from 'lodash';

const statusColourMap = {
  0: 'rgba(220,220,220,0.3)',
  4: 'rgba(255,255,224,0.9)',
  3: 'rgba(148,205,108,0.3)',
  2: 'rgba(255,191,0,0.2)',
  1: 'rgba(155,136,233,0.2)',
  5: 'rgba(103,164,236,0.2)',
};

function getLevelStatus(level, hhValue, hValue, lValue, llValue, userH, userL) {
  const currentLevel = _.toNumber(level) || 0;

  const getHH = () => {
    if (hhValue !== undefined) {
      const hh = _.toInteger(hhValue);

      if (currentLevel >= hh) {
        return 'error';
      } else {
        return 'success';
      }
    } else {
      return 'default';
    }
  };

  const getH = () => {
    if (hhValue !== undefined || hValue !== undefined) {
      const hh = _.toInteger(hhValue);
      const h = _.toInteger(hValue);
      if (currentLevel >= hh) {
        return 'error';
      } else if (currentLevel >= h) {
        return 'error';
      } else {
        return 'success';
      }
    } else {
      return 'default';
    }
  };

  const getLL = () => {
    if (llValue !== undefined) {
      const ll = _.toInteger(llValue);

      if (ll >= currentLevel) {
        return 'error';
      } else {
        return 'success';
      }
    } else {
      return 'default';
    }
  };

  const getL = () => {
    if (lValue !== undefined) {
      const l = _.toInteger(lValue);

      if (currentLevel <= l) {
        return 'error';
      } else {
        return 'success';
      }
    } else {
      return 'default';
    }
  };

  const getUserL = () => {
    if (userL !== undefined) {
      const user = _.toInteger(userL);

      if (currentLevel <= user) {
        return 'error';
      } else {
        return 'success';
      }
    } else {
      return 'default';
    }
  };

  const getUserH = () => {
    if (userH !== undefined) {
      const user = _.toInteger(userH);
      if (currentLevel >= user) {
        return 'error';
      } else {
        return 'success';
      }
    } else {
      return 'default';
    }
  };

  return {
    hh: getHH(),
    h: getH(),
    l: getL(),
    ll: getLL(),
    userL: getUserL(),
    userH: getUserH(),
  };
}

function transform(data, showAdditives) {
  const tanks = [];
  const summary = [];

  _.chain(data)
    .filter((object) => {
      if (!showAdditives) {
        // return !object?.tank_bclass_name?.includes('Additive');
        return object?.tank_base_class !== '6' && object?.tank_base_class !== '11';
      }

      return true;
    })
    // .groupBy((object) => object.tank_bclass_name)
    .groupBy((object) => object.tank_base_class)

    .map((value, key) => {
      const ullage = _.sumBy(value, (tank) => {
        return parseInt(tank.tank_ullage);
      });

      const volume = _.sumBy(value, (tank) => {
        return parseInt(tank.tank_amb_vol);
      });

      const capacity = ullage + volume;

      const fill = (volume * 100) / capacity;

      const baseProduct = value?.[0]?.tank_base + ' - ' + value?.[0]?.tank_base_name;

      summary.push({
        base_name: baseProduct, //key,
        tank_count: value.length,
        total_capacity: capacity,
        observed_quantity: volume,
        total_ullage: ullage,
        total_fill: _.isNaN(fill) ? 0 : _.round(fill, 2),
      });

      return true;
    })
    .value();

  _.forEach(data, (tank) => {
    const capacity = _.toNumber(tank?.tank_max_level) || 0;
    const level = _.toNumber(tank?.tank_prod_lvl) || 0;

    const percent = _.round(capacity === 0 ? 0 : (level * 100) / capacity, 2);

    const percentage = percent > 100 ? 100 : percent;

    const totalCapacity = _.toInteger(tank.tank_ullage) + _.toInteger(tank.tank_amb_vol) || 0;

    const baseColour = ['#fff', '', null].includes(tank?.tank_base_color) ? '#cdd6ac' : tank?.tank_base_color;
    const statusColour = statusColourMap[String(tank?.tank_status)];

    const levelStatus = getLevelStatus(
      tank?.tank_prod_lvl || '',
      tank?.tank_hh_level,
      tank?.tank_h_level,
      tank?.tank_l_level,
      tank?.tank_ll_level,
      tank?.tank_uh_level,
      tank?.tank_ul_level
    );

    const model = {
      code: tank?.tank_code,
      name: tank?.tank_name,

      status: {
        name: tank?.tank_status_name,
        colour: statusColour,
      },

      automatic: tank?.tank_gaugingmthd === '1',
      percentage,
      capacity,
      totalCapacity,

      critical: Object.values(levelStatus)?.includes('error'),
      baseColour,
      levels: {
        values: level,
        status: levelStatus,
      },

      labels: ['Tank'],

      payload: {
        labels: ['Tank'],
        datasets: [
          {
            label: 'Quantity',
            backgroundColor: baseColour,
            borderColor: 'rgba(105,105,105,0.9)',
            borderWidth: 1,
            hoverBackgroundColor: baseColour,
            hoverBorderColor: 'rgba(105,105,105,1)',
            data: [percentage],
          },
          {
            label: 'Ullage',
            backgroundColor: 'rgba(105,105,105,0.7)',
            borderColor: 'rgba(105,105,105,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(105,105,105,0.7)',
            hoverBorderColor: 'rgba(105,105,105,1)',
            data: percentage > 100 ? [0] : [100 - percentage],
          },
        ],
      },

      ...tank,
    };

    // if (tank?.tank_bclass_name?.includes('Additive') && !showAdditives) {
    if ((tank?.tank_base_class === '6' || tank?.tank_base_class === '11') && !showAdditives) {
      return null;
    } else {
      tanks.push(model);
    }
  });

  return {
    summary,
    tanks,
  };
}

export default transform;
