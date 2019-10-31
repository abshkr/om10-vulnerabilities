import axios from 'axios';

export function readMetering() {
  return axios.get(`/api/pages/metering/read.php?mass_unit=kg&vol_unit=litre`);
}

export function readSiteBalance() {
  return axios.get(`/api/pages/site_bal/read.php?unit=LITRES`);
}

export function readTankInventory() {
  return axios.get(`/api/pages/tank_inv/read.php`);
}

export function readProductInventory() {
  return axios.get(`/api/pages/prod_inv/read.php?unit=LITRES`);
}
