import api, { TANK_STATUS } from '../api';

const getTankVCF = async (base, temp, density) => {
  const values = {
    tank_base: base,
    tank_qty_type: 'LT',
    tank_qty_amount: 10000,
    tank_temp: temp,
    tank_density: density,
  };

  const results = await api.post(TANK_STATUS.CALCULATE_QUANTITY, values);
  // console.log('............getTankVCF', results);

  return results?.data;
};

export default getTankVCF;
