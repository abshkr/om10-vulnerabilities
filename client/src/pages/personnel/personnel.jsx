import React, { useState, useEffect, useCallback } from 'react';

import _ from 'lodash';
import { Modal, notification, Button } from 'antd';
import axios from 'axios';

import { authLevel } from '../../utils';
import { Page, DataTable, Download } from '../../components';
import { personnel } from '../../api';

import auth from '../../auth';
import columns from './columns';
import Forms from './forms';

const Personnel = ({ configuration, t, user }) => {
  const [data, setData] = useState([]);
  const [expiry, setExpiry] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const fields = columns(t);

  const handleClick = object => {
    const access = authLevel(user, 'HTML_PERSONNEL');

    Modal.info({
      title: object
        ? `${t('operations.editing')} (${object.per_code} / ${object.per_name})`
        : `${t('operations.create')}`,
      centered: true,
      width: '50vw',
      icon: object ? 'edit' : 'form',
      content: <Forms value={object} refresh={fetch} t={t} expiry={expiry} data={data} access={access} />,
      okButtonProps: {
        style: { display: 'none' }
      }
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
    <Page page={t('pageMenu.accessControl')} name={t('pageNames.personnel')} modifiers={modifiers}>
      <DataTable columns={fields} data={data} isLoading={isLoading} onClick={handleClick} t={t} />
    </Page>
  );
};

export default auth(Personnel);
