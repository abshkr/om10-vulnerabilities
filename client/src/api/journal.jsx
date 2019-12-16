import axios from 'axios';

export const readJournal = () => {
  return axios.get(`/api/pages/journal/read.php`);
};

export const searchJournal = (start, end) => {
  return axios.get(`/api/pages/journal/search.php?start_date=${start}&end_date=${end}`);
};
