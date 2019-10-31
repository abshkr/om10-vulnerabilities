import React, { useState, useEffect, useCallback } from 'react';

import _ from 'lodash';
import { Modal, notification } from 'antd';
import axios from 'axios';

import { Page, DataTable } from '../../components';
import { equipmentList } from '../../api';
import columns from './columns';
import auth from '../../auth';
import Forms from './forms';
import { authLevel } from '../../utils';

const EquipmentList = ({ configuration, t, user }) => {
  const [data, setData] = useState([]);
  const [expiry, setExpiry] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const handleClick = object => {
    const access = authLevel(user, 'HTML_EQUIPMENTLIST');

    Modal.info({
      title: !!object
        ? `${t('operations.editing')} (${object.eqpt_id} / ${object.eqpt_code})`
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
      .all([equipmentList.readEquipment(), equipmentList.readExpiry()])
      .then(
        axios.spread((equipment, expiry) => {
          setData(equipment.data.records);
          setExpiry(expiry.data.records);
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
    <Page page={t('pageMenu.schedules')} name={t('pageNames.equipmentList')} isLoading={isLoading}>
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

export default auth(EquipmentList);
