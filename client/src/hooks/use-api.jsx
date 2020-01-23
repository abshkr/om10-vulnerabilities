import { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';

const useAPI = urls => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const token = useSelector(state => state.auth.authenticated);

  const fetchData = useCallback(() => {
    setLoading(true);

    const options = {
      headers: {
        Authorization: token
      }
    };

    Promise.all(
      urls.map(url =>
        fetch(url, options)
          .then(data => {
            return data.json();
          })
          .catch(error => {
            setLoading(false);
            return error;
          })
      )
    )
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [urls, token]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  return { data, error, isLoading, refetch: fetchData };
};

export default useAPI;
