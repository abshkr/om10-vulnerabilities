import React, { useState, useEffect, useCallback } from 'react';

import { Modal, notification } from 'antd';
import axios from 'axios';
import _ from 'lodash';

import { Page, DataTable } from '../../components';
import { hazchemCodes } from '../../api';

import columns from './columns';
import auth from '../../auth';
import Forms from './forms';

const HazchemCodes = ({ configuration, t }) => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const handleClick = object => {
    Modal.info({
      title: !!object
        ? `${t('operations.editing')} (${object.hzcf_id} / ${object.hzcf_name})`
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
      .all([hazchemCodes.read()])
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
    <Page page={t('pageMenu.gantry')} name={t('pageNames.hazchemCodes')} isLoading={isLoading}>
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

export default auth(HazchemCodes);
