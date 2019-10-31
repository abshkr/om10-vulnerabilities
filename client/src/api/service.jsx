import axios from 'axios';

export function user() {
  return axios.get(`/api/service/cur_roledata.php`);
}

export function config() {
  return axios.get(`/api/config.php`);
}
