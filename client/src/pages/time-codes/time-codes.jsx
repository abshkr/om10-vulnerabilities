import React, { useState, useEffect, useCallback } from 'react';

import { Page, DataTable } from '../../components';
import { Modal, notification } from 'antd';
import { timeCodes } from '../../api';
import columns from './columns';
import auth from '../../auth';

import axios from 'axios';

const TimeCodes = ({ configuration, t }) => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const handleClick = object => {
    Modal.info({
      title: !!object
        ? `${t('operations.editing')} (${object.category_code})`
        : `${t('operations.create')}`,
      centered: true,
      width: '50vw',
      icon: !!object ? 'edit' : 'form',
      content: <div value={object} refresh={fetch} t={t} data={data} />,
      okButtonProps: {
        style: { display: 'none' },
      },
    });
  };

  const fetch = useCallback(() => {
    setLoading(true);
    axios
      .all([timeCodes.read()])
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
    <Page page={t('pageMenu.accessControl')} name={t('pageNames.timeCodes')} isLoading={isLoading}>
      <DataTable
        columns={columns(configuration, t)}
        data={data}
        isLoading={isLoading}
        click={handleClick}
        t={t}
        create={true}
      />
    </Page>
  );
};

export default auth(TimeCodes);
