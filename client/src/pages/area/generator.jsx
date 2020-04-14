import _ from 'lodash';

const generator = (areas) => {
  const payload = [];

  _.forEach(areas, (area) => {
    const entry = {
      ...area,
      gatesNames: _.uniq(_.map(area.gates, 'gate_k')),
    };

    payload.push(entry);
  });

  return payload;
};

export default generator;
