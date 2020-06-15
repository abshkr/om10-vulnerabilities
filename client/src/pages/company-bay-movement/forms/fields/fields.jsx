import React, { useEffect } from 'react';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';

import { COMPANY_BAY_MOVEMENT } from '../../../../api';

const Fields = ({ form, value }) => {
  const { t } = useTranslation();

  const { data: bays, isValidating: baysLoading } = useSWR(COMPANY_BAY_MOVEMENT.BAYS);
  const { data: suppliers, isValidating: supplierLoading } = useSWR(COMPANY_BAY_MOVEMENT.SUPPLIERS);
  const { data: types, isValidating: typesLoading } = useSWR(COMPANY_BAY_MOVEMENT.TYPES);

  const { setFieldsValue } = form;

  const isLoading = baysLoading || supplierLoading || typesLoading;

  const validate = (rule, value) => {
    const mapper = {
      bacl_bay_code: t('fields.bay'),
      bacl_cmpy_code: t('fields.company'),
      bacl_bay_type: t('fields.bayType'),
    };

    if (value === '' || (value !== 0 && !value)) {
      return Promise.reject(`${t('validate.select')} ─ ${mapper[rule.field]}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        bacl_bay_code: value.bacl_bay_code,
        bacl_cmpy_code: value.bacl_cmpy_code,
        bacl_bay_type: value.bacl_bay_type,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <>
      <Form.Item
        name="bacl_bay_code"
        label={t('fields.bay')}
        rules={[{ required: true, validator: validate }]}
      >
        <Select
          loading={isLoading}
          showSearch
          disabled={!!value}
          optionFilterProp="children"
          placeholder={!value ? t('placeholder.selectBay') : null}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {bays?.records.map((item, index) => (
            <Select.Option key={index} value={item}>
              {item}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="bacl_cmpy_code"
        label={t('fields.company')}
        rules={[{ required: true, validator: validate }]}
      >
        <Select
          loading={isLoading}
          showSearch
          disabled={!!value}
          optionFilterProp="children"
          placeholder={!value ? t('placeholder.selectCompany') : null}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {suppliers?.records.map((item, index) => (
            <Select.Option key={index} value={item.cmpy_code}>
              {item.cmpy_desc}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="bacl_bay_type"
        label={t('fields.bayType')}
        rules={[{ required: true, validator: validate }]}
      >
        <Select
          loading={isLoading}
          showSearch
          optionFilterProp="children"
          placeholder={!value ? t('placeholder.selectType') : null}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {types?.records.map((item, index) => (
            <Select.Option key={index} value={item.bacl_bay_type}>
              {item.bacl_bay_type_name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </>
  );
};

export default Fields;
