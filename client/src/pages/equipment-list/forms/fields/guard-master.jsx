import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Checkbox, Input, Divider, Row, Col } from 'antd';

const GuardMaster = ({ form, value }) => {
  const { t } = useTranslation();

  const { setFieldsValue } = form;

  useEffect(() => {
    if (value) {
      setFieldsValue({
        eqpt_guard_master_used: value.eqpt_guard_master_used,
        eqpt_guard_master_desc: value.eqpt_guard_master_desc,
      });
    }
  }, [value, setFieldsValue]);

  const validate = (rule, input) => {
    if (rule.required) {
      if (input === '' || !input) {
        return Promise.reject(`${t('validate.set')} ─ ${t('fields.copsGuardMasterDesc')}`);
      }
    }

    const len = new TextEncoder().encode(input).length;
    if (input && len > 200) {
      return Promise.reject(`${t('placeholder.maxCharacters')}: 200 ─ ${t('descriptions.maxCharacters')}`);
    }

    /* if (input !== undefined && input !== input.trimLeft()) {
      return Promise.reject(`${t('validate.invalidInput')}: ${t('validate.whiteSpaceInBeginning')}`);
    }
    if (input !== undefined && input !== input.trimRight()) {
      return Promise.reject(`${t('validate.invalidInput')}: ${t('validate.whiteSpaceInEnd')}`);
    } */

    return Promise.resolve();
  };

  return (
    <>
      <Divider>{t('fields.copsGuardMasterInfo')}</Divider>
      <Row justify="space-around">
        <Col span={6}>
          <Form.Item
            name="eqpt_guard_master_used"
            label={t('fields.copsGuardMasterUsed')}
            valuePropName="checked"
          >
            <Checkbox />
          </Form.Item>
        </Col>
        <Col span={18}>
          <Form.Item
            name="eqpt_guard_master_desc"
            label={t('fields.copsGuardMasterDesc')}
            rules={[{ required: false, validator: validate }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

export default GuardMaster;
