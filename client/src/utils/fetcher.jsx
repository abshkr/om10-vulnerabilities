import api from 'api';

const fetcher = (...args) => api.get(args).then((response) => response.data);

export default fetcher;
