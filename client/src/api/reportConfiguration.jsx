import axios from "axios";
import api from "./api";

export function readConfiguration() {
  return axios.get(`https://${api}/api/pages/report_config/read.php`);
}
