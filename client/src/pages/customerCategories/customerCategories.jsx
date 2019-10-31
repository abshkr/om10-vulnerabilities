import React, { useState, useEffect, useCallback } from 'react';

import { Page, DataTable } from '../../components';
import { Modal, notification } from 'antd';
import { customerCategories } from '../../api';
import _ from 'lodash';

import Forms from './forms';
import columns from './columns';
import auth from '../../auth';

import axios from 'axios';

const CustomerCategories = ({ configuration, t }) => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const handleClick = object => {
    Modal.info({
      title: !!object
        ? `${t('operations.editing')} (${object.category_code} / ${object.category_name})`
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
      .all([customerCategories.readCustomerCategories()])
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

  return (
    <Page
      page={t('pageMenu.customers')}
      name={t('pageNames.customerCategories')}
      isLoading={isLoading}
    >
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

export default auth(CustomerCategories);
