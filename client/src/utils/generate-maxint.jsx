import _ from 'lodash';

function generateMaxInt(digits) {
  const len = !digits ? 9 : digits;

  const max = _.parseInt(_.repeat('9', len));

  return max;
}

export default generateMaxInt;
