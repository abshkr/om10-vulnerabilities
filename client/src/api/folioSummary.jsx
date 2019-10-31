import axios from 'axios';

export function readFolioSummary() {
  return axios.get(`/api/pages/folio/read.php`);
}

export function readFolioTanks(id) {
  return axios.get(`/api/pages/folio/get_tanks.php?closeout_nr=${id}`);
}

export function readFolioMeters(id) {
  return axios.get(`/api/pages/folio/get_meters.php?closeout_nr=${id}`);
}

export function readFolioReports(id) {
  return axios.get(`/api/pages/folio/get_reports.php?closeout_nr=${id}`);
}

export function createPDS() {
  return axios.get(`/api/pages/folio/pds.php`);
}

export function closeFolio() {
  return axios.get(`/api/pages/folio/manual_close.php`);
}

export function openFolioReports(id, report) {
  return `/api/pages/folio/report_gateway.php?report=${id}/${report}`;
}

export function regenerateReports(id) {
  return axios.get(`/api/pages/folio/create_reports.php?closeout_nr=${id}`);
}

export function calculateTanks(payload) {
  return axios.post(`/api/pages/folio/calc_tank_vcfs.php`, payload);
}

export function updateMeter(payload) {
  return axios.post(`/api/pages/folio/update_meters.php`, payload);
}

export function updateTank(payload) {
  return axios.post(`/api/pages/folio/update_tanks.php`, payload);
}
