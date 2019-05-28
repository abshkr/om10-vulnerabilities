import _ from "lodash";
import { flowControlPriority } from "../../constants/definitions";

const progressCalculation = (flow, code) => {
  const value = _.chain(flow)
    .filter(value => {
      return value.base_code === code;
    })

    .groupBy("base_code")
    .mapValues(data => _.round((_.sumBy(data, value => value.current_flow_rate) / _.sumBy(data, value => value.flow_contribution)) * 100, 2))
    .value();

  const payload = isNaN(value[code]) ? 0 : value[code];
  return payload;
};

const generator = (base, flow) => {
  const payload = [];

  const filtered = _.filter(base, data => {
    return _.uniq(_.map(flow, "base_code")).includes(data.base_code);
  });

  _.forEach(filtered, key => {
    const flowRate = progressCalculation(flow, key.base_code);
    const armPriority = _.find(flowControlPriority, ["key", key.afc_priority]);
    const tanks = _.filter(flow, ["base_code", key.base_code]);
    const uniqueTanks = _.uniq(_.map(tanks, "tank_code"));

    payload.push({
      baseCode: key.base_code,
      baseName: key.base_name,
      armPriority: !!armPriority ? armPriority.value : "Not Set",
      baseColor: key.base_color,
      tankList: tanks,
      uniqueTanks: uniqueTanks.toString(),
      flowRate
    });
  });

  return payload;
};

export default generator;
