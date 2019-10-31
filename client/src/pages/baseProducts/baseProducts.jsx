import React, { useEffect, useCallback, useState } from 'react';

import axios from 'axios';
import Forms from './forms';
import auth from '../../auth';
import columns from './columns';

import { baseProducts } from '../../api';
import { Modal, notification } from 'antd';
import { Page, DataTable } from '../../components';

const BaseProducts = ({ configuration, t }) => {
  const [data, setData] = useState([]);

  const [filtered] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const handleClick = object => {
    Modal.info({
      title: !!object
        ? `${t('operations.editing')} (${object.base_code} / ${object.base_name})`
        : `${t('operations.create')}`,
      centered: true,
      icon: !!object ? 'edit' : 'form',
      width: '40vw',
      content: (
        <Forms refresh={fetch} value={object} t={t} data={data} configuration={configuration} />
      ),
      okButtonProps: {
        style: { display: 'none' },
      },
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

  const results = !!filtered ? filtered : data;
  const fields = columns(results, configuration, t);

  return (
    <Page
      page={t('pageMenu.schedules')}
      name={t('pageNames.baseProducts')}
      isLoading={isLoading}
      block={true}
    >
      <DataTable columns={fields} data={results} isLoading={isLoading} click={handleClick} />
    </Page>
  );
};

export default auth(BaseProducts);
