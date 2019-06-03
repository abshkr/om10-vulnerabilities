import axios from "axios";
import api from "./api";

export function readFolioSummary() {
  return axios.get(`https://${api}/api/pages/folio/read.php`);
}

export function readFolioTanks(id) {
  return axios.get(`https://${api}/api/pages/folio/get_tanks.php?closeout_nr=${id}`);
}

export function readFolioMeters(id) {
  return axios.get(`https://${api}/api/pages/folio/get_meters.php?closeout_nr=${id}`);
}
