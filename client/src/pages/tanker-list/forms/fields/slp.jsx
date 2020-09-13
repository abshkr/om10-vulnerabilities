import React, { useEffect } from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Form, Input, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';

const SLP = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        slp_id: value.slp_id
      });
    }
  }, [value, setFieldsValue]);

  const validate = (rule, input) => {
    if (input && input.length > 40) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 40 ─ ${t('descriptions.maxCharacters')}`);
    }

    return Promise.resolve();
  };

  return (
    <Form.Item name="slp_id" label={t('fields.slp')} rules={[{ required: false, validator: validate }]}>
      <Input
        disabled
        addonAfter={
          <Tooltip title={t('descriptions.funcNotAvailableAtThisStage')}>
            <InfoCircleOutlined style={{ fontSize: 16 }} />
          </Tooltip>
        }
      />
    </Form.Item>
  );
};

export default SLP;
