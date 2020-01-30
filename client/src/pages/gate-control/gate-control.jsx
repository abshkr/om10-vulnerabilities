import React, { useState, useEffect, useCallback } from 'react';

import { Button, notification } from 'antd';
import axios from 'axios';
import _ from 'lodash';

import { Page, DataTable } from '../../components';
import { HAZCHEM_CODES } from '../../api';

import columns from './columns';
import auth from '../../auth';

const GateControl = ({ t }) => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [selected, setSelected] = useState([]);

  const fields = columns(t);

  const fetch = useCallback(() => {
    setLoading(true);

    axios
      .all([HAZCHEM_CODES.read()])
      .then(
        axios.spread(records => {
          setData([
            {
              hzcf_id: 'test',
              hzcf_un_num: 'test',
              hzcf_name: 'test'
            },
            {
              hzcf_id: 'asda',
              hzcf_un_num: 'tesasdasdt',
              hzcf_name: 'asdad'
            }
          ]);
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
      <Button type="primary" icon="unlock" loading={isLoading} disabled={selected.length === 0}>
        {data.length === selected.length ? t('operations.openAllGates') : t('operations.openGate')}
      </Button>
    </>
  );

  return (
    <Page page={t('pageMenu.accessControl')} name={t('pageNames.gateControl')} modifiers={modifiers}>
      <DataTable columns={fields} data={data} isLoading={isLoading} handleSelect={setSelected} />
    </Page>
  );
};

export default auth(GateControl);
