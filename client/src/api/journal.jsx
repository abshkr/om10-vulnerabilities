import axios from "axios";
import api from "./api";

export function readJournal() {
  return axios.get(`https://${api}/api/pages/journal/read.php`);
}

export function searchJournal(start, end) {
  return axios.get(`https://${api}/api/pages/journal/search.php?start_date=${start}&end_date=${end}`);
}
