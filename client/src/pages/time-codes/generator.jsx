import _ from 'lodash';

const degenerate = (code, data, t) => {
  console.log(data);

  let result = {};
  for (let i = 0; i < data.length; i++) {
    let line = data[i];
    let line_time = 0;
    for (let j = 0; j <= 23; j++) {
      line_time += Math.pow(2, j) * line[j];
    }
    result[line.day] = line_time;
  }
  
  return {
    "tcd_title": code,
    "tcd_mon": result[t('fields.monday')],
    "tcd_tue": result[t('fields.tuesday')],
    "tcd_wed": result[t('fields.wednesday')],
    "tcd_thu": result[t('fields.thursday')],
    "tcd_fri": result[t('fields.friday')],
    "tcd_sat": result[t('fields.saturday')],
    "tcd_sun": result[t('fields.sunday')],
  };
};

const generator = (code, data, t) => {
  const filtered = _.find(data, ['tcd_title', code]);

  const payload = [];
  const codes = [];
  const hours = {};

  const days = [
    t('fields.monday'),
    t('fields.tuesday'),
    t('fields.wednesday'),
    t('fields.thursday'),
    t('fields.friday'),
    t('fields.saturday'),
    t('fields.sunday')
  ];

  const values = Object.values(_.omit(filtered, 'tcd_title'));

  const powers = [
    1,
    2,
    4,
    8,
    16,
    32,
    64,
    128,
    256,
    512,
    1024,
    2048,
    4096,
    8192,
    16384,
    32768,
    65536,
    131072,
    262144,
    524288,
    1048576,
    2097152,
    4194304,
    8388608
  ];

  for (let i = 0; i < values.length; i++) {
    let next = values[i];

    codes[i] = [];

    for (let k = 23; k >= 0; k--) {
      const power = powers[k];

      if (next >= power) {
        next = next - power;
        codes[i][k] = 1;

        hours[k] = true;
      } else {
        codes[i][k] = 0;
        hours[k] = false;
      }
    }

    payload.push({
      day: days[i],
      ...hours
    });
  }

  return payload;
};

export {generator, degenerate};
