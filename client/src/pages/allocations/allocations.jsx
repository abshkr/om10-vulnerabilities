import React, { useState, useEffect, useCallback } from 'react';

import _ from 'lodash';
import { Modal, notification } from 'antd';
import axios from 'axios';

import { authLevel } from '../../utils';
import { Page, DataTable } from '../../components';
import { allocations } from '../../api';
import columns from './columns';
import auth from '../../auth';
import Forms from './forms';

const Allocations = ({ configuration, t, user }) => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const handleClick = object => {
    const access = authLevel(user, 'M_ALLOCATIONS');

    Modal.info({
      title: !!object
        ? `${t('operations.editing')} (${object.alloc_typename} / ${object.alloc_suppname})`
        : `${t('operations.create')}`,
      centered: true,
      width: '80vw',
      icon: !!object ? 'edit' : 'form',
      content: <Forms value={object} refresh={fetch} t={t} data={data} access={access} />,
      okButtonProps: {
        style: { display: 'none' },
      },
    });
  };

  const fetch = useCallback(() => {
    setLoading(true);

    axios
      .all([allocations.read()])
      .then(
        axios.spread(payload => {
          setData(payload.data.records);
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
    <Page page={t('pageMenu.gantry')} name={t('pageNames.allocations')} isLoading={isLoading}>
      <DataTable
        columns={columns(t)}
        data={data}
        isLoading={isLoading}
        click={handleClick}
        t={t}
        create
      />
    </Page>
  );
};

export default auth(Allocations);
