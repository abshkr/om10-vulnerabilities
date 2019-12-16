import React, { useCallback, useEffect, useState } from 'react';

import _ from 'lodash';
import axios from 'axios';
import { notification, Select } from 'antd';

import { Page, DataTable } from '../../components';
import { stockManagement } from '../../api';
import transform from './transform';
import columns from './columns';
import auth from '../../auth';

const units = [
  'Litres',
  'Cubic Metre',
  'Imperial Gallon',
  'U.S Gallon',
  'Imperial Barrel',
  'U.S Barrel',
];

const ProductInventory = ({ configuration, t }) => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [unit, setUnit] = useState('Litres');

  const fetch = useCallback(() => {
    axios
      .all([stockManagement.readProductInventory()])
      .then(
        axios.spread(record => {
          const payload = transform(record.data.records, unit);

          setData(payload);
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
  }, [unit]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const UnitChanger = (
    <Select key="1" style={{ width: 200 }} defaultValue={unit} onChange={setUnit}>
      {units.map(item => {
        return (
          <Select.Option key={item} value={item}>
            {item}
          </Select.Option>
        );
      })}
    </Select>
  );

  return (
    <Page
      page={t('pageMenu.stockManagement')}
      name={t('pageNames.productInventory')}
      isLoading={isLoading}
    >
      <DataTable
        columns={columns(configuration, t)}
        data={data}
        isLoading={isLoading}
        t={t}
        modifiers={[UnitChanger]}
      />
    </Page>
  );
};

export default auth(ProductInventory);
