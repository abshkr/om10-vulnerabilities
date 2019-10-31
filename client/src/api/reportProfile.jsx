import axios from 'axios';

export function readProfile() {
  return axios.get(`/api/pages/report_profile/read.php`);
}

export function readCompany() {
  return axios.get(`/api/pages/report_config/companys.php`);
}

export function readReports() {
  return axios.get(`/api/pages/report_profile/jasper_files.php`);
}

export function createProfile(payload) {
  return axios.post(`/api/pages/report_profile/create.php`, payload);
}

export function updateProfile(payload) {
  return axios.post(`/api/pages/report_profile/update.php`, payload);
}

export function deleteProfile(payload) {
  return axios.post(`/api/pages/report_profile/delete.php`, payload);
}
