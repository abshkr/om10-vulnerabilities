import axios from 'axios';

export function readFlowRate() {
  return axios.get(`/api/pages/flow_rate/read.php`);
}

export function readTankMaxFlow() {
  return axios.get(`/api/pages/tank_max_flow/read.php`);
}

export function readTankCurrentFlow() {
  return axios.get(`/api/pages/tank/cur_max_flow.php`);
}
