import _ from 'lodash';
import { getKeyText } from 'utils';

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

  // group the arms, meters, injectors upon the bays and tanks
  const payload = [];
  for (let i = 0; i < len; i++) {
    const stream = data?.[i];
    // check if the bay tank has been listed in new array
    const baytank = _.find(
      payload,
      (o) =>
        o?.tank_code === stream?.tank_code &&
        o?.tank_terminal === stream?.tank_terminal &&
        o?.stream_baycode === stream?.stream_baycode
    );
    if (!baytank) {
      // not listed, then add it
      // clone it first
      const item = _.clone(stream);
      // add arm, meter, injector to collection
      item.stream_arms = getKeyText(stream?.stream_armcode, stream?.stream_armname);
      item.stream_meters = getKeyText(stream?.stream_mtrcode, stream?.stream_mtrname);
      item.stream_injectors = getKeyText(stream?.stream_injcode, stream?.stream_injname);
      delete item.stream_index;
      delete item.stream_armcode;
      delete item.stream_armname;
      delete item.stream_mtrcode;
      delete item.stream_mtrname;
      delete item.stream_injcode;
      delete item.stream_injname;
      delete item.stream_seq;
      payload.push(item);
    } else {
      // listed, then add arms, meters, injectors to it
      if (baytank?.stream_arms?.indexOf(stream?.stream_armcode) < 0) {
        baytank.stream_arms =
          baytank?.stream_arms + ', ' + getKeyText(stream?.stream_armcode, stream?.stream_armname);
      }
      if (baytank.stream_meters.indexOf(stream?.stream_mtrcode) < 0) {
        baytank.stream_meters =
          baytank?.stream_meters + ', ' + getKeyText(stream?.stream_mtrcode, stream?.stream_mtrname);
      }
      if (baytank.stream_injectors.indexOf(stream?.stream_injcode) < 0) {
        baytank.stream_injectors =
          baytank?.stream_injectors + ', ' + getKeyText(stream?.stream_injcode, stream?.stream_injname);
      }
    }
  }

  return _.filter(payload, (o) => o?.stream_baycode === key);
};

export default generator;
