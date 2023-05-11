import _ from 'lodash';
// import { getKeyText } from 'utils';

const generator = (array, key, t) => {
  // handle the meter data according to the value of injector
  const data = [];
  const len = array?.length;
  for (let i = 0; i < len; i++) {
    const item = array?.[i];
    if (item?.stream_injcode !== '') {
      const mitm = _.find(
        array,
        (o) =>
          o?.stream_seq === item?.stream_seq &&
          o?.stream_injcode === '' &&
          o?.stream_index === item?.stream_index
      );
      if (!mitm) {
        item.stream_mtrcode = '';
        item.stream_mtrname = '';
      } else {
        item.stream_mtrcode = mitm?.stream_mtrcode;
        item.stream_mtrname = mitm?.stream_mtrname;
      }
    }
    data.push(item);
  }

  const payload = data;

  return _.filter(payload, (o) => o?.stream_baycode === key);
};

export default generator;
