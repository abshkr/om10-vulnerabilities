import React, { useEffect, useCallback, useState } from 'react';

import axios from 'axios';
import Forms from './forms';
import auth from '../../auth';
import columns from './columns';

import { baseProducts } from '../../api';
import { Modal, notification, Button } from 'antd';
import { Page, DataTable, Download } from '../../components';

const BaseProducts = ({ configuration, t }) => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const fields = columns(t);

  const handleClick = object => {
    Modal.info({
      title: object
        ? `${t('operations.editing')} (${object.base_code} / ${object.base_name})`
        : `${t('operations.create')}`,
      centered: true,
      icon: object ? 'edit' : 'form',
      width: '40vw',
      content: <Forms refresh={fetch} value={object} t={t} data={data} configuration={configuration} />,
      okButtonProps: {
        style: { display: 'none' }
      }
    });
  };

  const fetch = useCallback(() => {
    setLoading(true);
    axios
      .all([baseProducts.readBaseProduct()])
      .then(
        axios.spread(response => {
          setLoading(false);
          setData(response.data.records);
        })
      )
      .catch(error => {
        setLoading(false);
        notification.error({
          message: error.message,
          description: t('descriptions.requestFailed')
        });
      });
  }, [t]);

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
    <Page page={t('pageMenu.schedules')} name={t('pageNames.baseProducts')} modifiers={modifiers}>
      <DataTable columns={fields} data={data} isLoading={isLoading} onClick={handleClick} t={t} />
    </Page>
  );
};

export default auth(BaseProducts);
