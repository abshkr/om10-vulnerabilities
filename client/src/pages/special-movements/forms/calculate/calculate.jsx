import React, { useEffect, useCallback, useState } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { Form, InputNumber, Select } from 'antd';

import { SPECIAL_MOVEMENTS } from '../../../../api';

const Calculate = ({ form, value, disabled, type, tank }) => {
  const { t } = useTranslation();

  const { data: options, isValidating } = useSWR(SPECIAL_MOVEMENTS.UNITS);

  const [isLoading, setLoading] = useState(true);
  const [limit, setLimit] = useState(null);
  const { setFieldsValue } = form;

  const IS_DISALBED = disabled || !type || isLoading;

  const getLimit = useCallback((tank) => {
    setLoading(true);

    axios
      .get(SPECIAL_MOVEMENTS.PRODUCTS, {
        params: {
          tank_code: tank,
        },
      })
      .then((response) => {
        if (response?.data?.records?.length > 0) {
          setLimit(response.data.records[0]);
          setLoading(false);
        }

        setLoading(false);
      })
      .catch((errors) => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (value) {
      setFieldsValue({
        mlitm_qty_amb: value?.mlitm_qty_amb,
        mlitm_qty_cor: value?.mlitm_qty_cor,
        mlitm_qty_kg: value?.mlitm_qty_kg,
        mlitm_temp_amb: value?.mlitm_temp_amb,
        mlitm_dens_cor: value?.mlitm_dens_cor,
      });
    }
  }, [value, setFieldsValue]);

  useEffect(() => {
    if (!value) {
      setFieldsValue({
        unit: 'BB6',
      });
    }
  }, [value, setFieldsValue]);

  useEffect(() => {
    if (tank) {
      getLimit(tank);
    }
  }, [getLimit, tank]);

  return (
    <div>
      <Form.Item name="mlitm_qty_amb" label={t('fields.observedQuantity')}>
        <InputNumber disabled={IS_DISALBED} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item name="mlitm_qty_cor" label={t('fields.standardQuantity')}>
        <InputNumber disabled={IS_DISALBED} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item name="mlitm_qty_kg" label={t('fields.observedMass')}>
        <InputNumber disabled={IS_DISALBED} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        name="mlitm_temp_amb"
        label={`${t('fields.observedTemperature')} [${limit ? `${limit.temp_lo} - ${limit.temp_hi}` : ''}]`}
      >
        <InputNumber
          min={limit?.temp_lo}
          max={limit?.temp_hi}
          disabled={IS_DISALBED}
          style={{ width: '100%' }}
        />
      </Form.Item>

      <Form.Item
        name="mlitm_dens_cor"
        label={`${t('fields.standardDensity')} [${limit ? `${limit.density_lo} - ${limit.density_hi}` : ''}]`}
      >
        <InputNumber
          min={limit?.density_lo}
          max={limit?.density_hi}
          disabled={IS_DISALBED}
          style={{ width: '100%' }}
        />
      </Form.Item>

      <div style={{ display: 'flex' }}>
        <Form.Item name="mlitm_qty_rpt" label={t('fields.alternateQuantity')} style={{ width: '75%' }}>
          <InputNumber disabled={IS_DISALBED} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item name="mlitm_unit_rpt" label={t('fields.unit')} style={{ width: '25%', marginLeft: 5 }}>
          <Select
            showSearch
            loading={isValidating}
            disabled={IS_DISALBED}
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {options?.records.map((item, index) => (
              <Select.Option key={index} value={item.unit}>
                {item.unit}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </div>
    </div>
  );
};

export default Calculate;
