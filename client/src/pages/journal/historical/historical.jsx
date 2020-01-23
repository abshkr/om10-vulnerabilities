import React, { useState, useCallback, useEffect } from 'react';

import axios from 'axios';
import { notification } from 'antd';
import _ from 'lodash';

import columns from './columns';
import { journal } from '../../../api';
import { DataTable } from '../../../components';

const Historical = ({ configuration, t, start, end }) => {
  const [data, setData] = useState([]);

  const [isLoading, setLoading] = useState(true);

  const fetch = useCallback(() => {
    setLoading(true);
    axios
      .all([journal.searchJournal(start, end)])
      .then(
        axios.spread(records => {
          setData(records.data.records);
          setLoading(false);
        })
      )
      .catch(errors => {
        _.forEach(errors.response.data.errors, error => {
          notification.error({
            message: error.type,
            description: error.message
          });
        });
      });
  }, [start, end]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return <DataTable columns={columns(configuration, t)} isLoading={isLoading} data={data} />;
};

export default Historical;
