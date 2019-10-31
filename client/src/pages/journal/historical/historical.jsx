import React, { useState, useCallback, useEffect } from 'react';

import axios from 'axios';
import moment from 'moment';
import { notification } from 'antd';
import _ from 'lodash';

import columns from './columns';
import { journal } from '../../../api';
import { DataTable, Calendar } from '../../../components';

const Historical = ({ configuration, t }) => {
  const [data, setData] = useState([]);
  const [start, setStart] = useState(
    moment()
      .subtract(3, 'hour')
      .format('YYYY-MM-DD HH:mm'),
  );
  const [isLoading, setLoading] = useState(true);
  const [end, setEnd] = useState(moment().format('YYYY-MM-DD HH:mm'));

  const setRange = (start, end) => {
    setStart(start);
    setEnd(end);
  };

  const fetch = useCallback(() => {
    setLoading(true);
    axios
      .all([journal.searchJournal(start, end)])
      .then(
        axios.spread(records => {
          setData(records.data.records);
          setLoading(false);
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
  }, [start, end]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const DatePicker = <Calendar handleChange={setRange} start={start} end={end} />;

  return (
    <DataTable
      columns={columns(configuration, t)}
      isLoading={isLoading}
      data={data}
      modifiers={[DatePicker]}
      t={t}
    />
  );
};

export default Historical;
