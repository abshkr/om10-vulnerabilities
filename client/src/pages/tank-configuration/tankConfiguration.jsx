import React, { useEffect, useCallback, useState } from 'react';

import axios from 'axios';
import { Modal, notification } from 'antd';
import _ from 'lodash';

import columns from './columns';
import Forms from './forms';

import transform from './transform';
import { tanks, baseProducts } from '../../api';
import { Page, DataTable } from '../../components';
import { authLevel } from '../../utils';
import auth from '../../auth';

const TankConfiguration = ({ configuration, t, user }) => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const handleClick = object => {
    const access = authLevel(user, 'HTML_TANKCONFIGURATION');

    Modal.info({
      title: object
        ? `${t('operations.editing')} (${object.tank_code} / ${object.tank_name})`
        : `${t('operations.create')}`,
      centered: true,
      width: '50vw',
      icon: object ? 'edit' : 'form',
      content: (
        <Forms
          value={object}
          refresh={fetch}
          configuration={configuration}
          access={access}
          data={data}
          t={t}
        />
      ),
      okButtonProps: {
        style: { display: 'none' },
      },
    });
  };

  const fetch = useCallback(() => {
    setLoading(true);
    axios
      .all([tanks.readTank(), baseProducts.readBaseProduct()])
      .then(
        axios.spread(tanks => {
          const transformed = transform(tanks.data.records);

          setData(transformed);
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
    <Page page={t('pageMenu.schedules')} name={t('pageNames.tankerList')}>
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

export default auth(TankConfiguration);
