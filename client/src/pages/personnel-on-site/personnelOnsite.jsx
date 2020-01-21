import React, { useCallback, useEffect, useState } from 'react';

import _ from 'lodash';
import { notification, Button } from 'antd';
import axios from 'axios';

import { Page, DataTable, Download } from '../../components';
import { personnelOnsite } from '../../api';
import columns from './columns';
import auth from '../../auth';

const PersonnelOnSite = ({ configuration, t }) => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const fields = columns(t);

  const fetch = useCallback(() => {
    setLoading(true);

    axios
      .all([personnelOnsite.read()])
      .then(
        axios.spread(record => {
          setData(record.data.records);
          setLoading(false);
        })
      )
      .catch(errors => {
        setLoading(false);
        _.forEach(errors.response.data.errors, error => {
          notification.error({
            message: error.type,
            description: error.message
          });
        });
      });
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const modifiers = (
    <>
      <Button icon="sync" onClick={() => fetch()} loading={isLoading}>
        {t('operations.refresh')}
      </Button>
      <Download data={data} isLoading={isLoading} columns={fields} />
    </>
  );

  return (
    <Page page={t('pageMenu.reports')} name={t('pageNames.personnelOnSite')} modifiers={modifiers}>
      <DataTable columns={fields} data={data} isLoading={isLoading} />
    </Page>
  );
};

export default auth(PersonnelOnSite);
