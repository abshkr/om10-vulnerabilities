import React from 'react';

const useFetch = endpoints => {
  const [data, setData] = React.useState(null);
  const [errors, setErrors] = React.useState(null);
  const [isLoading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetch = async () => {
      isLoading(true);

      axios
        .all(endpoints)
        .then(data => {
          setLoading(false);
          setData(data);
        })
        .catch(errors => {
          setLoading(false);
          setErrors(errors);
        });
    };
    fetch();
  }, []);
  return { data, errors, isLoading };
};

export default useFetch;
