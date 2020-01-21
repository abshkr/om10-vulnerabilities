import React, { useState, useEffect, useCallback } from 'react';

import { Page, DataTable, Download } from '../../components';
import { Modal, notification, Button } from 'antd';
import { logicalPrinters } from '../../api';
import _ from 'lodash';

import columns from './columns';
import auth from '../../auth';
import Forms from './forms';
import axios from 'axios';

const LogicalPrinters = ({ configuration, t }) => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const fields = columns(t);

  const handleClick = object => {
    Modal.info({
      title: !!object ? `${t('operations.editing')} (${object.prt_printer})` : `${t('operations.create')}`,
      centered: true,
      width: '50vw',
      icon: !!object ? 'edit' : 'form',
      content: <Forms value={object} refresh={fetch} t={t} data={data} />,
      okButtonProps: {
        style: { display: 'none' }
      }
    });
  };

  const fetch = useCallback(() => {
    setLoading(true);
    axios
      .all([logicalPrinters.readLogicalPrinters()])
      .then(
        axios.spread(records => {
          setData(records.data.records);
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
      <Button type="primary" icon="plus" onClick={() => handleClick(null)} loading={isLoading}>
        {t('operations.create')}
      </Button>
    </>
  );

  return (
    <Page page={t('pageMenu.printers')} name={t('pageNames.logicalPrinters')} modifiers={modifiers}>
      <DataTable columns={fields} data={data} isLoading={isLoading} onClick={handleClick} />
    </Page>
  );
};

export default auth(LogicalPrinters);
