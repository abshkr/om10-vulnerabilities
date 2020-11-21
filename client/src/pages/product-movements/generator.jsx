import _ from 'lodash';

const generator = (data) => {
  const payload = [];

  _.forEach(data, (element) => {
    const percentage = _.round((element.pmv_moved_qty / element.pmv_intended_qty) * 100, 1);

    payload.push({
      ...element,
      percentage,
    });
  });

  return payload;
};

export default generator;
