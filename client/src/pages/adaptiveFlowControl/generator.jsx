import _ from "lodash";

const progressCalculation = (flow, code) => {
  const value = _.chain(flow)
    .filter(value => {
      return value.base_code === code;
    })

    .groupBy("base_code")
    .mapValues(data => (_.sumBy(data, value => value.flow_contribution) / _.sumBy(data, value => value.current_flow_rate)) * 100)
    .value();

  return value;
};

const generator = (base, flow) => {
  const payload = [];

  const uniqueBaseProducts = _.uniq(_.map(flow, "base_code"));

  const filtered = _.filter(base, data => {
    return uniqueBaseProducts.includes(data.base_code);
  });

  _.forEach(filtered, key => {
    const calculation = progressCalculation(flow, key.base_code);
    const flowRate = _.isInteger(calculation[key.base_code]) ? calculation[key.base_code] : 0;
    payload.push({
      baseCode: key.base_code,
      baseName: key.base_name,
      armPriority: "High",
      baseColor: key.base_color,
      tankList: _.filter(flow, ["base_code", key.base_code]),
      activity: {
        current: _.filter(flow, value => {
          return value.base_code === key.base_code && value.flowing === "Y";
        }).length,
        total: _.filter(flow, value => {
          return value.base_code === key.base_code;
        }).length
      },
      flowRate,
      state: ""
    });
  });

  return payload;
};

export default generator;
