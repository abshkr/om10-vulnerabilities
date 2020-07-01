import api from 'api';

const fetcher = (url) => api.get(url).then((response) => response.data);

export default fetcher;
