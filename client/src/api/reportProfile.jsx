import axios from "axios";
import api from "./api";

export function readProfile() {
  return axios.get(`https://${api}/api/pages/report_profile/read.php`);
}

export function readCompany() {
  return axios.get(`https://${api}/api/pages/report_config/companys.php`);
}

export function readReports() {
  return axios.get(`https://${api}/api/pages/report_config/reports.php`);
}

export function createProfile(payload) {
  return axios.post(`https://${api}/api/pages/report_profile/create.php`, payload);
}

export function updateProfile(payload) {
  return axios.post(`https://${api}/api/pages/report_profile/update.php`, payload);
}

export function deleteProfile(payload) {
  return axios.post(`https://${api}/api/pages/report_profile/delete.php`, payload);
}
