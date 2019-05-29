import axios from "axios";
import api from "./api";

export function readFlowRate() {
  return axios.get(`https://${api}/api/pages/flow_rate/read.php`);
}

export function readTankMaxFlow() {
  return axios.get(`https://${api}/api/pages/tank_max_flow/read.php`);
}

export function readTankCurrentFlow() {
  return axios.get(`https://${api}/api/pages/tank/cur_max_flow.php`);
}
