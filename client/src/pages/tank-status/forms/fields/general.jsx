import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, InputNumber, Input, Select, Divider } from 'antd';
import useSWR from 'swr';

import { TANK_STATUS } from '../../../../api';

const General = ({ form, value, refTempC, refTempF }) => {
  const { t } = useTranslation();

  const { data: areas, isValidating: areasLoading } = useSWR(TANK_STATUS.AREAS);
  const { data: status, isValidating: statusLoading } = useSWR(TANK_STATUS.STATUS);
  const { data: methods, isValidating: methodsLoading } = useSWR(TANK_STATUS.METHODS);

  const isLoading = areasLoading || statusLoading || methodsLoading;

  const { setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        tank_location: value.tank_location,
        tank_status: value.tank_status,
        tank_gaugingmthd: value.tank_gaugingmthd,
        tank_ullage: value.tank_ullage,
        tank_sulphur: value.tank_sulphur,
        tank_flashpoint: value.tank_flashpoint,
        tank_code: value.tank_code,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <>
      <Form.Item name="tank_code" label={t('fields.tankCode')}>
        <Input disabled style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item name="tank_location" label={t('fields.area')}>
        <Select
          dropdownMatchSelectWidth={false}
          allowClear
          loading={isLoading}
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {areas?.records.map((item, index) => (
            <Select.Option key={index} value={item.area_name}>
              {item.area_name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name="tank_status" label={t('fields.tankStatus')}>
        <Select
          dropdownMatchSelectWidth={false}
          allowClear
          loading={isLoading}
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {status?.records.map((item, index) => (
            <Select.Option key={index} value={item.tank_status_id}>
              {item.tank_status_name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name="tank_gaugingmthd" label={t('fields.gaugingMethod')}>
        <Select
          dropdownMatchSelectWidth={false}
          allowClear
          loading={isLoading}
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {methods?.records.map((item, index) => (
            <Select.Option key={index} value={item.gauge_method_id}>
              {item.gauge_method_name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Divider />

      <Form.Item label={t('fields.referenceTemperature')}>
        <Input disabled style={{ width: '100%' }} value={`${refTempC}°C / ${refTempF}°F`} />
      </Form.Item>

      <Form.Item name="tank_ullage" label={t('fields.ullage')}>
        <InputNumber min={0} max={999999999} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item name="tank_sulphur" label={`${t('fields.sulphur')} (${t('units.sulphur')})`}>
        <InputNumber min={0} max={999999999} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item name="tank_flashpoint" label={`${t('fields.flashPoint')} (${t('units.celsius')})`}>
        <InputNumber min={0} max={999999999} style={{ width: '100%' }} />
      </Form.Item>
    </>
  );
};

export default General;
