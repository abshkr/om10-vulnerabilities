import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import _ from 'lodash';

const useQuery = predicates => {
  const location = useLocation();

  const [params, setParams] = useState({});

  const handleQuery = value => {
    return new URLSearchParams(value);
  };

  useEffect(() => {
    const payload = {};
    _.forEach(predicates, predicate => {
      const value = handleQuery(location.search).get(predicate);

      payload[predicate] = value;
    });

    setParams(payload);

    // eslint-disable-next-line
  }, [location]);

  return {
    params
  };
};

export default useQuery;
