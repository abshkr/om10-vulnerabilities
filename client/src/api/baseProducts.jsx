import axios from "axios";
import api from "./api";

export function readBaseProduct() {
  return axios.get(`https://${api}/api/pages/base_prod/read.php`);
}
