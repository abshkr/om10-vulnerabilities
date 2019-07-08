const development = "10.1.10.66";
const production = window.location.hostname;
const api = production === "localhost" || "10.1.10.80" ? development : production;

export default api;
