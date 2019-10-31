import React, { useEffect, useState, useCallback } from 'react';

import axios from 'axios';
import { Modal, notification } from 'antd';

import { Page, DataTable } from '../../components';
import { area } from '../../api';
import columns from './columns';
import auth from '../../auth';
import Forms from './forms';

const Area = ({ configuration, t }) => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const handleClick = object => {
    Modal.info({
      title: !!object
        ? `${t('operations.editing')} (${object.area_k} / ${object.area_name})`
        : `${t('operations.create')}`,
      centered: true,
      icon: !!object ? 'edit' : 'form',
      width: '40vw',
      content: <Forms refresh={fetch} value={object} t={t} data={data} />,
      okButtonProps: {
        style: { display: 'none' },
      },
    });
  };

  const fetch = useCallback(() => {
    setLoading(true);
    axios
      .all([area.readArea()])
      .then(
        axios.spread(response => {
          setLoading(false);
          setData(response.data.records);
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
    <Page page={t('pageMenu.accessControl')} name={t('pageNames.area')} isLoading={isLoading}>
      <DataTable
        t={t}
        columns={columns(t)}
        data={data}
        isLoading={isLoading}
        click={handleClick}
        create
      />
    </Page>
  );
};

export default auth(Area);
