const objectToQuery = (url, object) => {
  const payload = Object.keys(object)
    .map(key => key + '=' + object[key])
    .join('&');

  return `${url}?${payload}`;
};

export default objectToQuery;
