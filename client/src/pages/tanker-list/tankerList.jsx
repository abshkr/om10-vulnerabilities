import React, { useState, useEffect, useCallback } from 'react';

import axios from 'axios';
import { Modal, notification } from 'antd';
import _ from 'lodash';

import { Page, DataTable } from '../../components';
import { authLevel } from '../../utils';
import { tankerList } from '../../api';
import columns from './columns';
import auth from '../../auth';
import Forms from './forms';

const TankerList = ({ configuration, t, user }) => {
  const [data, setData] = useState([]);
  const [expiry, setExpiry] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const handleClick = object => {
    const access = authLevel(user, 'HTML_TANKERS');

    Modal.info({
      title: !!object
        ? `${t('operations.editing')} (${object.tnkr_name} / ${object.tnkr_code})`
        : `${t('operations.create')}`,
      centered: true,
      width: '50vw',
      icon: !!object ? 'edit' : 'form',
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
      .all([tankerList.tankers(), tankerList.expiry()])
      .then(
        axios.spread((tankers, expiry) => {
          setLoading(false);
          setData(tankers.data.records);
          setExpiry(expiry.data.records);
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
    <Page page={t('pageMenu.schedules')} name={t('pageNames.tankerList')} isLoading={isLoading}>
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

export default auth(TankerList);
