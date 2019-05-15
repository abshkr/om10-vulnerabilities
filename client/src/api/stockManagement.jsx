import axios from "axios";
import api from "./api";

export function readMetering() {
  return axios.get(`https://${api}/api/pages/metering/read.php?mass_unit=kg&vol_unit=litre`);
}
