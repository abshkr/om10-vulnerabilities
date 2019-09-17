import axios from "axios";
import api from "./api";


export function read() {
  return axios.get(`https://${api}/api/pages/personnel_onsite/read.php`);
}
