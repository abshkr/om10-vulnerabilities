import _ from 'lodash';

// help with the fake load testing

export default function load() {
  const products = [];
  const flow = [];
  const current = [];

  for (let index = 0; index < 40; index++) {
    const product = {
      afc_enabled: false,
      afc_priority: index % 2 ? 'LILO' : '',
      base_name: `Product ${index}`,
      base_code: index,
    };

    products.push(product);
  }

  for (let index = 0; index < 40; index++) {
    const tank = {
      baa_code: `Arm ${index}`,
      bad_physcode: `Bay ${index}`,
      bam_code: `Meter ${index}`,
      base_code: index,
      base_name: `Product ${index}`,
      current_flow_rate: _.random(0, 5000),
      flow_contribution: _.random(5000, 6000),
      flowing: 'N',
      high_flow_state: '0',
      loaded_qty: 0,
      preset: 0,
      tank_code: `Tank ${index}`,
    };

    const rate = {
      flow_rate: 8000,
      tank_code: `Tank ${index}`,
      tank_level: 9077,
    };
    flow.push(tank);
    current.push(rate);
  }

  return {
    products,
    flow,
    current,
  };
}
