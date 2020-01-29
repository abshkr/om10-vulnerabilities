const fetcher = (...args) =>
  fetch(args, {
    headers: {
      Authorization: sessionStorage.getItem('token')
    }
  }).then(res => res.json());

export default fetcher;
