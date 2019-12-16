import React, { useCallback, useEffect, useState } from 'react';

import _ from 'lodash';
import { notification } from 'antd';
import axios from 'axios';

import { Page, DataTable } from '../../components';
import { personnelOnsite } from '../../api';
import columns from './columns';
import auth from '../../auth';

const PersonnelOnSite = ({ configuration, t }) => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const fetch = useCallback(() => {
    axios
      .all([personnelOnsite.read()])
      .then(
        axios.spread(record => {
          setData(record.data.records);
          setLoading(false);
        }),
      )
      .catch(errors => {
        setLoading(false);
        _.forEach(errors.response.data.errors, error => {
          notification.error({
            message: error.type,
            description: error.message,
          });
        });
      });
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return (
    <Page page={t('pageMenu.reports')} name={t('pageNames.metering')} isLoading={isLoading}>
      <DataTable columns={columns(configuration, t)} data={data} isLoading={isLoading} t={t} />
    </Page>
  );
};

export default auth(PersonnelOnSite);
