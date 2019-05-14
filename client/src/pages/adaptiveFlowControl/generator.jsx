import _ from "lodash";

const progressCalculation = (flow, code) => {
  const value = _.chain(flow)
    .filter(value => {
      return value.base_code === code;
    })

    .groupBy(value => "key")
    .mapValues(data => (_.sumBy(data, value => _.toInteger(value.flow_contribution)) / _.sumBy(data, value => _.toInteger(value.current_flow_rate))) * 100)
    .value();

  const payload = value.key === Infinity ? 0 : value.key;

  return payload;
};

const generator = (base, flow) => {
  const payload = [];

  const uniqueBaseProducts = _.uniq(_.map(flow, "base_code"));

  const filtered = _.filter(base, data => {
    return uniqueBaseProducts.includes(data.base_code);
  });

  _.forEach(filtered, key => {
    payload.push({
      baseCode: key.base_code,
      baseName: key.base_name,
      armPriority: "High",
      baseColor: key.base_color,
      tankList: _.filter(flow, ["base_code", key.base_code]),
      flowRate: progressCalculation(flow, key.base_code),
      state: ""
    });
  });

  return payload;
};

export default generator;
