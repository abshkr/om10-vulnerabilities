import React, { useEffect, useState, useCallback } from 'react';

import _ from 'lodash';
import axios from 'axios';
import { Modal, notification } from 'antd';

import { Page, DataTable } from '../../components';
import { reportConfiguration } from '../../api';
import { authLevel } from '../../utils';
import columns from './columns';
import auth from '../../auth';
import Forms from './forms';

const ReportConfiguration = ({ configuration, t, user }) => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const handleClick = object => {
    const access = authLevel(user, 'HTML_REPOCONFIGURATION');

    Modal.info({
      title: object
        ? `${t('operations.editing')} (${object.report_name} / ${object.report_type_name})`
        : `${t('operations.create')}`,
      centered: true,
      width: '50vw',
      icon: object ? 'edit' : 'form',
      content: <Forms value={object} refresh={fetch} t={t} data={data} access={access} />,
      okButtonProps: {
        style: { display: 'none' },
      },
    });
  };

  const fetch = useCallback(() => {
    setLoading(true);
    axios
      .all([reportConfiguration.readConfiguration()])
      .then(
        axios.spread(data => {
          setData(data.data.records);
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
      page={t('pageMenu.reports')}
      name={t('pageNames.reportConfiguration')}
      isLoading={isLoading}
    >
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

export default auth(ReportConfiguration);
