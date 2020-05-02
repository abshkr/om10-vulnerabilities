import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, InputNumber } from 'antd';

const Flow = ({ form, value }) => {
  const { setFieldsValue } = form;

  const { t } = useTranslation();

  const validate = (rule, value) => {
    const mapper = {
      bam_min_flow: t('fields.minimumFlow'),
      bam_max_flow: t('fields.maximumFlow'),
      bam_kfa: t('fields.kFactor'),
    };

    if (value === '' || !value) {
      return Promise.reject(`${t('validate.set')} ─ ${mapper[rule.field]}`);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (value) {
      setFieldsValue({
        bam_min_flow: value.bam_min_flow,
        bam_max_flow: value.bam_max_flow,
        bam_kfa: value.bam_kfa,
      });
    }
  }, [value, setFieldsValue]);

  return (
    <>
      <Form.Item
        name="bam_min_flow"
        label={`${t('fields.minimumFlow')} [1 ~ 60]`}
        rules={[{ required: true, validator: validate }]}
      >
        <InputNumber style={{ width: '100%' }} min={1} max={60} />
      </Form.Item>

      <Form.Item
        name="bam_max_flow"
        label={`${t('fields.maximumFlow')} [1 ~ 60]`}
        rules={[{ required: true, validator: validate }]}
      >
        <InputNumber style={{ width: '100%' }} min={1} max={60} />
      </Form.Item>

      <Form.Item
        name="bam_kfa"
        label={`${t('fields.kFactor')} [1 ~ 20]`}
        rules={[{ required: true, validator: validate }]}
      >
        <InputNumber style={{ width: '100%' }} min={1} max={20} />
      </Form.Item>
    </>
  );
};

export default Flow;
