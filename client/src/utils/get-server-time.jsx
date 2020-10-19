import api, { COMMON } from 'api';

const getServerTime = async () => {
  const results = await api.get(`${COMMON.SYS_DATE}`);

  return results?.data?.records;
};

export default getServerTime;
