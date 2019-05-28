const development = "10.1.10.188";
const production = window.location.hostname;
const api = production === "localhost" ? development : production;

export default api;
