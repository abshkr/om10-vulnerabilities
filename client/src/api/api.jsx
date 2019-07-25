const development = "10.1.10.66";
const production = window.location.hostname;
const api = process.env.NODE_ENV === "production" ? production : development;

export default api;
