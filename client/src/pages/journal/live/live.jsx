import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import _ from 'lodash';
import columns from './columns';
import { notification } from 'antd';
import { journal } from '../../../api';
import { DataTable } from '../../../components';

const Live = ({ configuration, t }) => {
  const [data, setData] = useState([]);

  const fetch = useCallback(() => {
    axios
      .all([journal.readJournal()])
      .then(
        axios.spread(records => {
          setData(records.data.records);
        }),
      )
      .catch(errors => {
        _.forEach(errors.response.data.errors, error => {
          notification.error({
            message: error.type,
            description: error.message,
          });
        });
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch();
    }, 1000);

    return () => clearInterval(interval);
  }, [fetch]);

  return (
    <DataTable
      columns={columns(configuration, t)}
      isLoading={data.length === 0}
      create={false}
      data={data}
      t={t}
    />
  );
};

export default Live;
