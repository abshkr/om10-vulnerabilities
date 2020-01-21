import { useEffect, useState } from 'react';

const useConfiguration = () => {
  const [config, setConfig] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const res = await fetch('/api/config.php');
        const json = await res.json();

        setConfig(json);
        setLoading(false);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, []);
  return { config, error, isLoading };
};

export default useConfiguration;
