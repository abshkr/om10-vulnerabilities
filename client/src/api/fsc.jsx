import axios from 'axios';

export function heartbeat() {
  return axios.get(`/api/pages/fsc/heatbeat.php`);
}

export function batch() {
  return axios.get(`/api/pages/fsc/batch_counts.php`);
}

export function which() {
  return axios.get(`/api/pages/fsc/which.php`);
}
