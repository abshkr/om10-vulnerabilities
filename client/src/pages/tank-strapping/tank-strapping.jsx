import React, { useState, useEffect } from 'react';

import { Button, Select, InputNumber } from 'antd';
import { useTranslation } from 'react-i18next';
import { SyncOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import _ from 'lodash';
import useSWR from 'swr';

import { Page, DataTable, FormModal } from '../../components';
import { TANK_STATUS, TANK_STRAPPING } from '../../api';
import { useQuery } from '../../hooks';
import columns from './columns';
import auth from '../../auth';

import Forms from './forms';

const TankStrapping = () => {
  const [tank, setTank] = useState(null);
  const [tanks, setTanks] = useState([]);
  const [straps, setStraps] = useState(null);
  const [height, setHeight] = useState(700);

  const { t } = useTranslation();
  const { params } = useQuery(['tank_code']);

  const { data: payload, isValidating, revalidate } = useSWR(TANK_STATUS.READ);

  const fields = columns(t);

  const handleClick = (value) => {
    FormModal({
      value,
      form: <Forms value={value} />,
      id: value?.strap_height,
      name: value?.strap_volume,
      t,
    });
  };

  const modifiers = (
    <div style={{ display: 'flex' }}>
      <InputNumber
        style={{ marginRight: 5, width: 150 }}
        value={height}
        onPressEnter={(e) => setHeight(e.target.value)}
      />

      <Select key="1" style={{ width: 200 }} value={tank} onChange={setTank} loading={isValidating}>
        {tanks.map((item) => {
          return (
            <Select.Option key={item} value={item}>
              {item}
            </Select.Option>
          );
        })}
      </Select>

      <Button icon={<SyncOutlined />} onClick={() => revalidate()} loading={isValidating}>
        {t('operations.refresh')}
      </Button>

      <Button type="primary" icon={<PlusOutlined />} onClick={() => handleClick(null)} loading={isValidating}>
        {t('operations.create')}
      </Button>
    </div>
  );

  useEffect(() => {
    const values = _.uniq(_.map(payload?.records, 'tank_code'));
    const tank = params?.tank_code || values[0];

    setTank(tank);

    setTanks(values);
  }, [payload, params]);

  useEffect(() => {
    if (tank) {
      setStraps(null);
      axios.get(`${TANK_STRAPPING.READ}?strap_tankcode=${tank}&start_height=${height}`).then((response) => {
        setStraps(response.data.records);
      });
    }
  }, [tank, height]);

  return (
    <Page page={t('pageMenu.gantry')} name={t('pageNames.tankStrapping')} modifiers={modifiers}>
      <DataTable columns={fields} data={straps} isLoading={isValidating} onClick={handleClick} />
    </Page>
  );
};

export default auth(TankStrapping);
