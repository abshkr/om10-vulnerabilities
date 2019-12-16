import React, { useState, useEffect, useCallback } from 'react';

import { Page, DataTable } from '../../components';
import { Modal, notification } from 'antd';
import { physicalPrinters } from '../../api';
import columns from './columns';
import auth from '../../auth';
import Forms from './forms';
import axios from 'axios';

const PhysicalPrinters = ({ configuration, t }) => {
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
      .all([physicalPrinters.readPhysicalPrinters()])
      .then(
        axios.spread(records => {
          setData(records.data.records);
          setLoading(false);
        }),
      )
      .catch(error => {
        setLoading(false);
        notification.error({
          message: error.message,
          description: t('descriptions.requestFailed'),
        });
      });
  }, [t]);

  useEffect(() => {
    fetch();
  }, [fetch]);

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

export default auth(PhysicalPrinters);
