import React, { Component } from 'react';
import { Tank } from '../../../components';

import _ from 'lodash';

export default class Tanks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  handleStatusProcess = (level, hhValue, hValue, lValue, llValue, userH, userL) => {
    const currentLevel = _.toInteger(level !== '' ? level : 0);

    const getHH = () => {
      if (hhValue !== '') {
        const hh = _.toInteger(hhValue);

        if (currentLevel >= hh) {
          return 'processing';
        } else {
          return 'success';
        }
      } else {
        return 'success';
      }
    };

    const getH = () => {
      if (hhValue !== '' || hValue !== '') {
        const hh = _.toInteger(hhValue);
        const h = _.toInteger(hValue);
        if (currentLevel >= hh) {
          return 'processing';
        } else if (currentLevel >= h) {
          return 'processing';
        } else {
          return 'success';
        }
      } else {
        return 'success';
      }
    };

    const getLL = () => {
      if (llValue !== '') {
        const ll = _.toInteger(llValue);

        if (ll >= currentLevel) {
          return 'processing';
        } else {
          return 'success';
        }
      } else {
        return 'success';
      }
    };

    const getL = () => {
      if (llValue !== '' || lValue !== '') {
        const ll = _.toInteger(llValue);
        const l = _.toInteger(lValue);
        if (ll >= currentLevel) {
          return 'processing';
        } else if (l >= currentLevel) {
          return 'processing';
        } else {
          return 'success';
        }
      } else {
        return 'success';
      }
    };

    const getUserL = () => {
      if (userL !== '') {
        const user = _.toInteger(userL);
        if (currentLevel <= user) {
          return 'processing';
        } else {
          return 'success';
        }
      } else {
        return 'success';
      }
    };

    const getUserH = () => {
      if (userH !== '') {
        const user = _.toInteger(userH);
        if (currentLevel >= user) {
          return 'processing';
        } else {
          return 'success';
        }
      } else {
        return 'success';
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
  };

  hexToRgb = hex => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;

    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
      return r + r + g + g + b + b;
    });

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? `rgba(${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)}, 1)`
      : null;
  };

  handleManipulation = results => {
    const data = [];

    const status = {
      'In Service - Not used': 'rgba(220,220,220,0.3)',
      'Out of Service': 'rgba(103,164,236, 0.2)',
      'In Service - Working': 'rgba(255,255,224,0.9)',
      'In Service - Loading': 'rgba(148,205,108,0.3)',
      'In Service - Settling': 'rgba(255,191,0,0.2)',
      'In Service - Receiving': 'rgba(155,136,233,0.2)',
      'Out Of Service - Offline': 'rgba(103,164,236,0.2)',
    };

    _.forEach(results, tank => {
      const capacity = _.toInteger(tank.tank_max_level);
      const volume = _.toInteger(tank.tank_prod_lvl);

      let percent = _.isNaN((volume * 100) / capacity)
        ? 0.0
        : ((volume * 100) / capacity).toFixed(2);

      if (capacity === 0) {
        percent = 0;
      }

      const levels = this.handleStatusProcess(
        tank.tank_prod_lvl,
        tank.tank_hh_level,
        tank.tank_h_level,
        tank.tank_l_level,
        tank.tank_ll_level,
        tank.tank_uh_level,
        tank.tank_ul_level,
      );

      const baseColor =
        tank.tank_base_color !== '' ? this.hexToRgb(tank.tank_base_color) : 'rgba(205,214,172,1)';

      data.push({
        code: tank.tank_code,
        name: tank.tank_name,
        status: tank.tank_status_name,
        title: tank.tank_base_name,
        color: status[tank.tank_status_name],
        defaults: tank,
        percent,
        level: tank.tank_prod_lvl,
        automatic: tank.tank_gaugingmthd === '1',
        levels,
        volume,
        payload: {
          labels: ['Tank'],
          datasets: [
            {
              label: 'Quantity',
              backgroundColor: baseColor,
              borderColor: 'rgba(105,105,105,0.9)',
              borderWidth: 1,
              hoverBackgroundColor: baseColor,
              hoverBorderColor: 'rgba(105,105,105,1)',
              data: [percent],
            },
            {
              label: 'Ullage',
              backgroundColor: 'rgba(105,105,105,0.7)',
              borderColor: 'rgba(105,105,105,1)',
              borderWidth: 1,
              hoverBackgroundColor: 'rgba(105,105,105,0.7)',
              hoverBorderColor: 'rgba(105,105,105,1)',
              data: percent > 100 ? [0] : [100 - percent],
            },
          ],
        },
      });
    });

    this.setState({
      data,
    });
  };

  componentDidMount() {
    const { results } = this.props;

    this.handleManipulation(results);
  }

  componentDidUpdate(prevProps) {
    if (this.props.results !== prevProps.results) {
      this.handleManipulation(this.props.results);
    }
  }

  render() {
    const { data } = this.state;
    const { handleClick } = this.props;

    return (
      <div className="tank-view">
        {data.map((item, index) => {
          return (
            <Tank key={index} tank={item} handleClick={handleClick} height={300} width={410} />
          );
        })}
      </div>
    );
  }
}
