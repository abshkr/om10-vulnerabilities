import React, { useEffect, useState, useCallback } from 'react';

import _ from 'lodash';
import axios from 'axios';
import { Modal, notification, Button } from 'antd';

import { Page, DataTable, Download } from '../../components';
import { reportConfiguration } from '../../api';
import { authLevel } from '../../utils';
import columns from './columns';
import auth from '../../auth';
import Forms from './forms';

const ReportConfiguration = ({ configuration, t, user }) => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const fields = columns(t);

  const handleClick = object => {
    const access = authLevel(user, 'HTML_REPOCONFIGURATION');

    Modal.info({
      title: object
        ? `${t('operations.editing')} (${object.report_cmpyname} / ${object.report_cmpycode})`
        : `${t('operations.create')}`,
      centered: true,
      width: '50vw',
      icon: object ? 'edit' : 'form',
      content: <Forms value={object} refresh={fetch} t={t} data={data} access={access} />,
      okButtonProps: {
        style: { display: 'none' }
      }
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
    <Page page={t('pageMenu.reports')} name={t('pageNames.reportConfiguration')} modifiers={modifiers}>
      <DataTable columns={fields} data={data} isLoading={isLoading} t={t} onClick={handleClick} />
    </Page>
  );
};

export default auth(ReportConfiguration);
