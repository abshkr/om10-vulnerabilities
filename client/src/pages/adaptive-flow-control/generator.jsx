import _ from 'lodash';

export default function generator(products, flow, current) {
  const payload = [];

  const tanks = _.uniqBy(flow, 'tank_code');

  for (let index = 0; index < tanks.length; index++) {
    const tank = tanks[index];

    const product = _.find(products, ['base_code', tank?.base_code]);

    const arms = _.filter(flow, ['tank_code', tank?.tank_code]);
    const levels = _.find(current, ['tank_code', tank?.tank_code]);

    const currentFlowRate = _.round(_.sumBy(arms, 'current_flow_rate'), 2);
    const rate = _.round((currentFlowRate / 0) * 100, 2);

    // add arm number to arms
    _.forEach(arms, (arm) => {
      arm.baa_index = _.toNumber(arm?.baa_code?.substr(4, 2));
      arm.baa_desc = String(arm.baa_index) + ' - ' + arm.baa_code;
    });

    payload.push({
      tankCode: tank?.tank_code,
      baseCode: tank?.base_code,
      baseName: tank?.base_name,
      enabled: product?.afc_enabled,
      armPriority: product?.afc_priority !== '' ? product?.afc_priority : 'Not Set',
      level: levels.tank_level,
      arms,
      max: _.round(0, 2),
      flowRate: rate,
      currentFlowRate: currentFlowRate,
    });
  }

  return payload;
}
