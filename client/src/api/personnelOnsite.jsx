import axios from 'axios';

export function read() {
  return axios.get(`/api/pages/personnel_onsite/read.php`);
}
