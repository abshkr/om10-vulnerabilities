import _ from 'lodash';

const findArmPriority = (bases, baseCode) => {
  const base = _.find(bases, ['base_code', baseCode]);
  return base.afc_priority !== '' ? base.afc_priority : 'Not Set';
};

const findTankLevel = (current, tankCode) => {
  const level = _.find(current, ['tank_code', tankCode]);
  return level;
};

const findFlowRate = (arms, max) => {
  const total = _.sumBy(arms, 'current_flow_rate');
  const percent = _.round((total / max) * 100, 2);
  return percent;
};

const generator = (base, flow, current) => {
  const payload = [];
  const filtered = _.uniqBy(flow, 'tank_code');
  _.forEach(filtered, key => {
    const levels = findTankLevel(current, key.tank_code);
    const arms = _.filter(flow, ['tank_code', key.tank_code]);

    payload.push({
      tankCode: key.tank_code,
      baseCode: key.base_code,
      baseName: key.base_name,
      armPriority: findArmPriority(base, key.base_code),
      level: levels.tank_level,
      arms,
      max: levels.flow_rate,
      flowRate: findFlowRate(arms, levels.flow_rate),
      currentFlowRate: _.sumBy(arms, 'current_flow_rate'),
    });
  });

  return payload;
};

export default generator;
