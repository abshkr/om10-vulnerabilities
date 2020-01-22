import React, { useState, useEffect, useCallback } from 'react';

import { Button, notification, Modal } from 'antd';
import axios from 'axios';
import _ from 'lodash';

import { Page, DataTable, Download } from '../../components';
import { hazchemCodes } from '../../api';

import Forms from './forms';

import columns from './columns';
import auth from '../../auth';

const ExpiryDates = ({ t }) => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [selected, setSelected] = useState([]);

  const fields = columns(t);

  const handleClick = object => {
    Modal.info({
      title: !!object
        ? `${t('operations.editing')} (${object.eqpt_id} / ${object.eqpt_code})`
        : `${t('operations.create')}`,
      centered: true,
      width: '50vw',
      icon: !!object ? 'edit' : 'form',
      content: <Forms value={object} refresh={fetch} t={t} access={true} />,
      okButtonProps: {
        style: { display: 'none' }
      }
    });
  };

  const fetch = useCallback(() => {
    setLoading(true);

    axios
      .all([hazchemCodes.read()])
      .then(
        axios.spread(records => {
          setData([
            {
              hzcf_id: 'test',
              hzcf_un_num: 'test',
              hzcf_name: 'test'
            },
            {
              hzcf_id: 'asda',
              hzcf_un_num: 'tesasdasdt',
              hzcf_name: 'asdad'
            }
          ]);
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
    <Page page={t('pageMenu.accessControl')} name={t('pageNames.expiryDates')} modifiers={modifiers}>
      <DataTable
        columns={fields}
        data={data}
        isLoading={isLoading}
        handleSelect={setSelected}
        height={300}
        onClick={handleClick}
      />
    </Page>
  );
};

export default auth(ExpiryDates);
