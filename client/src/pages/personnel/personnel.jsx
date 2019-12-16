import React, { useState, useEffect, useCallback } from 'react';

import _ from 'lodash';
import { Modal, notification } from 'antd';
import axios from 'axios';

import { authLevel } from '../../utils';
import { Page, DataTable } from '../../components';
import { personnel } from '../../api';

import auth from '../../auth';
import columns from './columns';
import Forms from './forms';

const Personnel = ({ configuration, t, user }) => {
  const [data, setData] = useState([]);
  const [expiry, setExpiry] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const handleClick = object => {
    const access = authLevel(user, 'HTML_PERSONNEL');

    Modal.info({
      title: object
        ? `${t('operations.editing')} (${object.per_code} / ${object.per_name})`
        : `${t('operations.create')}`,
      centered: true,
      width: '50vw',
      icon: object ? 'edit' : 'form',
      content: (
        <Forms value={object} refresh={fetch} t={t} expiry={expiry} data={data} access={access} />
      ),
      okButtonProps: {
        style: { display: 'none' },
      },
    });
  };

  const fetch = useCallback(() => {
    setLoading(true);
    axios
      .all([personnel.readPersonnel(), personnel.readPersonnelExpiryTypes()])
      .then(
        axios.spread((personnel, expiry) => {
          setExpiry(expiry.data.records);
          setData(personnel.data.records);
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
    <Page page={t('pageMenu.accessControl')} name={t('pageNames.personnel')} isLoading={isLoading}>
      <DataTable
        columns={columns(t)}
        data={data}
        isLoading={isLoading}
        click={handleClick}
        t={t}
        create={true}
      />
    </Page>
  );
};

export default auth(Personnel);
