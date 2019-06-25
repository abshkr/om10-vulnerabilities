import axios from "axios";
import api from "./api";

export function readMetering() {
  return axios.get(`https://${api}/api/pages/metering/read.php?mass_unit=kg&vol_unit=litre`);
}

export function readSiteBalance() {
  return axios.get(`https://${api}/api/pages/site_bal/read.php?unit=LITRES`);
}

export function readTankInventory() {
  return axios.get(`https://${api}/api/pages/tank_inv/read.php`);
}

export function readProductInventory() {
  return axios.get(`https://${api}/api/pages/prod_inv/read.php?unit=LITRES`);
}
