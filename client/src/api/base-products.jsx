import axios from 'axios';

export function readBaseProduct() {
  return axios.get(`/api/pages/base_prod/read.php`);
}

export function readBaseProductClassification() {
  return axios.get(`/api/pages/base_prod/base_classes.php`);
}

export function readBaseProductCorrectionMethods() {
  return axios.get(`/api/pages/base_prod/corr_mthds.php`);
}

export function readBaseProductGroups() {
  return axios.get(`/api/pages/base_prod/prod_groups.php`);
}

export function readBaseProductRefTemp() {
  return axios.get(`/api/pages/base_prod/ref_temp_specs.php`);
}

export function createBaseProduct(payload) {
  return axios.post(`/api/pages/base_prod/create.php`, payload);
}

export function updateBaseProduct(payload) {
  return axios.post(`/api/pages/base_prod/update.php`, payload);
}

export function deleteBaseProduct(payload) {
  return axios.post(`/api/pages/base_prod/delete.php`, payload);
}
