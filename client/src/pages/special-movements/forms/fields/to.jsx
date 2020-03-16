import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';

const To = () => {
  const { t } = useTranslation();

  const IS_DISABLED = false;

  return (
    <div style={{ display: 'flex' }}>
      <Form.Item
        name="mlitm_prodcmpy_to"
        label={t('fields.toPlantSupplier')}
        style={{ width: '100%', marginRight: 5 }}
      >
        <Select
          showSearch
          disabled={IS_DISABLED}
          optionFilterProp="children"
          placeholder={t('placeholder.selectToPlantSupplier')}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {[]?.records?.map((item, index) => (
            <Select.Option key={index} value={item.cmpy_code}>
              {item.cmpy_code} - {item.cmpy_name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="mlitm_tankcode_to"
        label={t('fields.toTank')}
        style={{ width: '100%', marginRight: 5 }}
      >
        <Select
          showSearch
          disabled={IS_DISABLED}
          optionFilterProp="children"
          placeholder={t('placeholder.selectToTank')}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {[]?.records?.map((item, index) => (
            <Select.Option key={index} value={item.cmpy_code}>
              {item.cmpy_code} - {item.cmpy_name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name="mlitm_prodcode_to" label={t('fields.toProduct')} style={{ width: '100%' }}>
        <Select
          showSearch
          disabled={IS_DISABLED}
          optionFilterProp="children"
          placeholder={t('placeholder.selectToProduct')}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {[]?.records?.map((item, index) => (
            <Select.Option key={index} value={item.cmpy_code}>
              {item.cmpy_code} - {item.cmpy_name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </div>
  );
};

export default To;
