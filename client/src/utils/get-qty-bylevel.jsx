import api, { TANK_STATUS } from '../api';

const getQtyByLevel = async (code, level) => {
  const results = await api.get(`${TANK_STATUS.QTY_BY_LEVEL}?tank_code=${code}&tank_lvl=${level}`);
  // console.log('............getQtyByLevel', results);

  return results?.data;
};

export default getQtyByLevel;
