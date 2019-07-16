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

export function readFolioReports(id) {
  return axios.get(`https://${api}/api/pages/folio/get_reports.php?closeout_nr=${id}`);
}

export function createPDS() {
  return axios.get(`https://${api}/api/pages/folio/pds.php`);
}

export function closeFolio() {
  return axios.get(`https://${api}/api/pages/folio/manual_close.php`);
}

export function openFolioReports(id, report) {
  return `https://${api}/api/pages/folio/report_gateway.php?report=${id}/${report}`;
}

export function regenerateReports(id) {
  return axios.get(`https://${api}/api/pages/folio/create_reports.php?closeout_nr=${id}`);
}

export function calculateVCF(payload) {
  return axios.post(`https://${api}/api/pages/folio/calc_vcfs.php`, payload);
}
