import React, { useState, useEffect, useCallback } from 'react';

import { Page, DataTable } from '../../components';
import { Modal, notification } from 'antd';
import { logicalPrinters } from '../../api';
import _ from 'lodash';

import columns from './columns';
import auth from '../../auth';
import Forms from './forms';
import axios from 'axios';

const LogicalPrinters = ({ configuration, t }) => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const handleClick = object => {
    Modal.info({
      title: !!object
        ? `${t('operations.editing')} (${object.prt_printer})`
        : `${t('operations.create')}`,
      centered: true,
      width: '50vw',
      icon: !!object ? 'edit' : 'form',
      content: <Forms value={object} refresh={fetch} t={t} data={data} />,
      okButtonProps: {
        style: { display: 'none' },
      },
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

  console.log(isLoading);
  return (
    <Page page={t('pageMenu.printers')} name={t('pageNames.logicalPrinters')} isLoading={isLoading}>
      <DataTable
        columns={columns(configuration, t)}
        data={data}
        isLoading={isLoading}
        click={handleClick}
        t={t}
        create
      />
    </Page>
  );
};

export default auth(LogicalPrinters);
